import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { isEqualCaseInsensitive } from '../../../../../shared/modules/string-utils';
import { getNfts } from '../../../../ducks/metamask/metamask';
import { TypographyVariant } from '../../../../helpers/constants/design-system';
import {
  ADD_NFT_ROUTE,
  ASSET_ROUTE,
} from '../../../../helpers/constants/routes';
import withModalProps from '../../../../helpers/higher-order-components/with-modal-props';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import { ignoreTokens } from '../../../../store/actions';
import Typography from '../../../ui/typography';
import Modal from '../../modal';

const ConvertTokenToNFTModal = ({ hideModal, tokenAddress }) => {
  const history = useHistory();
  const t = useI18nContext();
  const dispatch = useDispatch();
  const allNfts = useSelector(getNfts);
  const tokenAddedAsNFT = allNfts.find(({ address }) =>
    isEqualCaseInsensitive(address, tokenAddress),
  );

  return (
    <Modal
      onSubmit={async () => {
        if (tokenAddedAsNFT) {
          await dispatch(
            ignoreTokens({
              tokensToIgnore: tokenAddress,
              dontShowLoadingIndicator: true,
            }),
          );
          const { tokenId } = tokenAddedAsNFT;
          history.push({
            pathname: `${ASSET_ROUTE}/${tokenAddress}/${tokenId}`,
          });
        } else {
          history.push({
            pathname: ADD_NFT_ROUTE,
            state: { tokenAddress },
          });
        }
        hideModal();
      }}
      submitText={t('yes')}
      onCancel={() => hideModal()}
      cancelText={t('cancel')}
    >
      <div className="convert-token-to-nft-modal">
        <Typography
          variant={TypographyVariant.H6}
          boxProps={{
            marginTop: 2,
          }}
        >
          {tokenAddedAsNFT
            ? t('convertTokenToNFTExistDescription')
            : t('convertTokenToNFTDescription')}
        </Typography>
      </div>
    </Modal>
  );
};

ConvertTokenToNFTModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  tokenAddress: PropTypes.string,
};

export default withModalProps(ConvertTokenToNFTModal);
