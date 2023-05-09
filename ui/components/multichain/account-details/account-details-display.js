import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MetaMetricsEventCategory,
  MetaMetricsEventKeyType,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import {
  AlignItems,
  DISPLAY,
  FLEX_DIRECTION,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { isHardwareKeyring } from '../../../helpers/utils/hardware';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  getCurrentChainId,
  getHardwareWalletType,
  getMetaMaskKeyrings,
} from '../../../selectors';
import { setAccountLabel } from '../../../store/actions';
import {
  BUTTON_SECONDARY_SIZES,
  ButtonSecondary,
} from '../../component-library';
import Box from '../../ui/box/box';
import EditableLabel from '../../ui/editable-label/editable-label';
import QrView from '../../ui/qr-code';

export const AccountDetailsDisplay = ({
  accounts,
  accountName,
  address,
  onExportClick,
}) => {
  const dispatch = useDispatch();
  const trackEvent = useContext(MetaMetricsContext);
  const t = useI18nContext();

  const keyrings = useSelector(getMetaMaskKeyrings);
  const keyring = keyrings.find((kr) => kr.accounts.includes(address));
  const exportPrivateKeyFeatureEnabled = !isHardwareKeyring(keyring?.type);

  const chainId = useSelector(getCurrentChainId);
  const deviceName = useSelector(getHardwareWalletType);

  return (
    <Box
      display={DISPLAY.FLEX}
      alignItems={AlignItems.center}
      flexDirection={FLEX_DIRECTION.COLUMN}
    >
      <EditableLabel
        defaultValue={accountName}
        onSubmit={(label) => {
          dispatch(setAccountLabel(address, label));
          trackEvent({
            category: MetaMetricsEventCategory.Accounts,
            event: MetaMetricsEventName.AccountRenamed,
            properties: {
              location: 'Account Details Modal',
              chain_id: chainId,
              account_hardware_type: deviceName,
            },
          });
        }}
        accounts={accounts}
      />
      <QrView Qr={{ data: address }} />
      {exportPrivateKeyFeatureEnabled ? (
        <ButtonSecondary
          block
          size={BUTTON_SECONDARY_SIZES.LG}
          variant={TextVariant.bodyMd}
          onClick={() => {
            trackEvent({
              category: MetaMetricsEventCategory.Accounts,
              event: MetaMetricsEventName.KeyExportSelected,
              properties: {
                key_type: MetaMetricsEventKeyType.Pkey,
                location: 'Account Details Modal',
              },
            });
            onExportClick();
          }}
        >
          {t('showPrivateKey')}
        </ButtonSecondary>
      ) : null}
    </Box>
  );
};

AccountDetailsDisplay.propTypes = {
  accounts: PropTypes.array.isRequired,
  accountName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onExportClick: PropTypes.func.isRequired,
};
