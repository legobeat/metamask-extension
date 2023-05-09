import copyToClipboard from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { shortenAddress } from '../../../../../../helpers/utils/util';
import { useI18nContext } from '../../../../../../hooks/useI18nContext';
import {
  getMemoizedMetadataContractName,
  getMemoizedAddressBook,
} from '../../../../../../selectors';
import Identicon from '../../../../../ui/identicon';
import NicknamePopovers from '../../../../modals/nickname-popovers';

const Address = ({
  checksummedRecipientAddress,
  onRecipientClick,
  addressOnly,
  recipientEns,
  recipientName,
}) => {
  const t = useI18nContext();
  const [showNicknamePopovers, setShowNicknamePopovers] = useState(false);

  const addressBook = useSelector(getMemoizedAddressBook);
  const addressBookEntryObject = addressBook.find(
    (entry) =>
      entry.address.toLowerCase() === checksummedRecipientAddress.toLowerCase(),
  );
  const recipientNickname = addressBookEntryObject?.name;
  const recipientMetadataName = useSelector((state) =>
    getMemoizedMetadataContractName(state, checksummedRecipientAddress),
  );

  const recipientToRender = addressOnly
    ? recipientName ||
      recipientNickname ||
      recipientMetadataName ||
      recipientEns ||
      shortenAddress(checksummedRecipientAddress)
    : recipientName ||
      recipientNickname ||
      recipientMetadataName ||
      recipientEns ||
      t('newContract');

  return (
    <div
      className="tx-insight tx-insight-component tx-insight-component-address"
      onClick={() => {
        copyToClipboard(checksummedRecipientAddress);
        if (onRecipientClick) {
          onRecipientClick();
        }
      }}
    >
      <div className="tx-insight-component-address__sender-icon">
        <Identicon address={checksummedRecipientAddress} diameter={18} />
      </div>

      <div
        className="tx-insight-component-address__name"
        onClick={() => setShowNicknamePopovers(true)}
      >
        {recipientToRender}
      </div>
      {showNicknamePopovers ? (
        <NicknamePopovers
          onClose={() => setShowNicknamePopovers(false)}
          address={checksummedRecipientAddress}
        />
      ) : null}
    </div>
  );
};

Address.propTypes = {
  checksummedRecipientAddress: PropTypes.string,
  recipientName: PropTypes.string,
  recipientEns: PropTypes.string,
  addressOnly: PropTypes.bool,
  onRecipientClick: PropTypes.func,
};

export default Address;
