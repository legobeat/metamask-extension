import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { TransactionEnvelopeType } from '../../../../shared/constants/transaction';
import { getCurrentDraftTransaction } from '../../../ducks/send';
import { isLegacyTransaction } from '../../../helpers/utils/transactions.util';
import {
  checkNetworkAndAccountSupports1559,
  txDataSelector,
} from '../../../selectors';
import GasDetailsItem from '../gas-details-item';
import { ConfirmLegacyGasDisplay } from './confirm-legacy-gas-display';

const ConfirmGasDisplay = ({ userAcknowledgedGasMissing = false }) => {
  const { txParams } = useSelector((state) => txDataSelector(state));

  const draftTransaction = useSelector(getCurrentDraftTransaction);
  const transactionType = draftTransaction?.transactionType;
  let isLegacyTxn;
  if (transactionType) {
    isLegacyTxn = transactionType === TransactionEnvelopeType.legacy;
  } else {
    isLegacyTxn = isLegacyTransaction(txParams);
  }

  const networkAndAccountSupports1559 = useSelector(
    checkNetworkAndAccountSupports1559,
  );
  const supportsEIP1559 = networkAndAccountSupports1559 && !isLegacyTxn;

  return supportsEIP1559 ? (
    <GasDetailsItem userAcknowledgedGasMissing={userAcknowledgedGasMissing} />
  ) : (
    <ConfirmLegacyGasDisplay />
  );
};

ConfirmGasDisplay.propTypes = {
  userAcknowledgedGasMissing: PropTypes.bool,
};

export default ConfirmGasDisplay;
