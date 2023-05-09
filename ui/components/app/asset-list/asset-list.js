import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import { getNativeCurrency } from '../../../ducks/metamask/metamask';
import { PRIMARY, SECONDARY } from '../../../helpers/constants/common';
import {
  Color,
  TextVariant,
  TextAlign,
} from '../../../helpers/constants/design-system';
import { useCurrencyDisplay } from '../../../hooks/useCurrencyDisplay';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { useUserPreferencedCurrency } from '../../../hooks/useUserPreferencedCurrency';
import {
  getSelectedAccountCachedBalance,
  getShouldShowFiat,
  getNativeCurrencyImage,
  getDetectedTokensInCurrentNetwork,
  getIstokenDetectionInactiveOnNonMainnetSupportedNetwork,
  getTokenList,
} from '../../../selectors';
import { Text } from '../../component-library';
import {
  DetectedTokensBanner,
  MultichainTokenListItem,
  MultichainImportTokenLink,
} from '../../multichain';
import Box from '../../ui/box/box';
import AssetListItem from '../asset-list-item';
import DetectedToken from '../detected-token/detected-token';
import ImportTokenLink from '../import-token-link';
import TokenList from '../token-list';
import DetectedTokensLink from './detected-tokens-link/detected-tokens-link';

const AssetList = ({ onClickAsset }) => {
  const t = useI18nContext();

  const [showDetectedTokens, setShowDetectedTokens] = useState(false);

  const selectedAccountBalance = useSelector(getSelectedAccountCachedBalance);
  const nativeCurrency = useSelector(getNativeCurrency);
  const showFiat = useSelector(getShouldShowFiat);
  const trackEvent = useContext(MetaMetricsContext);
  const balance = useSelector(getSelectedAccountCachedBalance);
  const balanceIsLoading = !balance;

  const {
    currency: primaryCurrency,
    numberOfDecimals: primaryNumberOfDecimals,
  } = useUserPreferencedCurrency(PRIMARY, { ethNumberOfDecimals: 4 });
  const {
    currency: secondaryCurrency,
    numberOfDecimals: secondaryNumberOfDecimals,
  } = useUserPreferencedCurrency(SECONDARY, { ethNumberOfDecimals: 4 });

  const [, primaryCurrencyProperties] = useCurrencyDisplay(
    selectedAccountBalance,
    {
      numberOfDecimals: primaryNumberOfDecimals,
      currency: primaryCurrency,
    },
  );

  const [secondaryCurrencyDisplay, secondaryCurrencyProperties] =
    useCurrencyDisplay(selectedAccountBalance, {
      numberOfDecimals: secondaryNumberOfDecimals,
      currency: secondaryCurrency,
    });

  const primaryTokenImage = useSelector(getNativeCurrencyImage);
  const detectedTokens = useSelector(getDetectedTokensInCurrentNetwork) || [];
  const istokenDetectionInactiveOnNonMainnetSupportedNetwork = useSelector(
    getIstokenDetectionInactiveOnNonMainnetSupportedNetwork,
  );
  const tokenList = useSelector(getTokenList);
  const tokenData = Object.values(tokenList).find(
    (token) => token.symbol === primaryCurrencyProperties.suffix,
  );
  const title = tokenData?.name || primaryCurrencyProperties.suffix;
  return (
    <>
      {process.env.MULTICHAIN ? (
        <MultichainTokenListItem
          onClick={() => onClickAsset(nativeCurrency)}
          title={title}
          primary={
            primaryCurrencyProperties.value ?? secondaryCurrencyProperties.value
          }
          tokenSymbol={primaryCurrencyProperties.suffix}
          secondary={showFiat ? secondaryCurrencyDisplay : undefined}
          tokenImage={balanceIsLoading ? null : primaryTokenImage}
        />
      ) : (
        <AssetListItem
          onClick={() => onClickAsset(nativeCurrency)}
          data-testid="wallet-balance"
          primary={
            primaryCurrencyProperties.value ?? secondaryCurrencyProperties.value
          }
          tokenSymbol={primaryCurrencyProperties.suffix}
          secondary={showFiat ? secondaryCurrencyDisplay : undefined}
          tokenImage={balanceIsLoading ? null : primaryTokenImage}
          identiconBorder
        />
      )}

      <TokenList
        onTokenClick={(tokenAddress) => {
          onClickAsset(tokenAddress);
          trackEvent({
            event: MetaMetricsEventName.TokenScreenOpened,
            category: MetaMetricsEventCategory.Navigation,
            properties: {
              token_symbol: primaryCurrencyProperties.suffix,
              location: 'Home',
            },
          });
        }}
      />
      {detectedTokens.length > 0 &&
        !istokenDetectionInactiveOnNonMainnetSupportedNetwork && (
          <>
            {process.env.MULTICHAIN ? (
              <DetectedTokensBanner
                actionButtonOnClick={() => setShowDetectedTokens(true)}
                margin={4}
              />
            ) : (
              <DetectedTokensLink
                setShowDetectedTokens={setShowDetectedTokens}
              />
            )}
          </>
        )}
      <Box marginTop={detectedTokens.length > 0 ? 0 : 4}>
        {process.env.MULTICHAIN ? (
          <MultichainImportTokenLink margin={4} />
        ) : (
          <>
            <Text
              color={Color.textAlternative}
              variant={TextVariant.bodySm}
              as="h6"
              textAlign={TextAlign.Center}
            >
              {t('missingToken')}
            </Text>

            <ImportTokenLink />
          </>
        )}
      </Box>
      {showDetectedTokens && (
        <DetectedToken setShowDetectedTokens={setShowDetectedTokens} />
      )}
    </>
  );
};

AssetList.propTypes = {
  onClickAsset: PropTypes.func.isRequired,
};

export default AssetList;
