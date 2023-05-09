import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { AssetType } from '../../../shared/constants/transaction';
import { clearConfirmTransaction } from '../../ducks/confirm-transaction/confirm-transaction.duck';
import { editExistingTransaction } from '../../ducks/send';
import { sendTokenTokenAmountAndToAddressSelector } from '../../selectors';
import { showSendTokenPage } from '../../store/actions';
import ConfirmSendToken from './confirm-send-token.component';

const mapStateToProps = (state) => {
  const { tokenAmount } = sendTokenTokenAmountAndToAddressSelector(state);

  return {
    tokenAmount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editExistingTransaction: async ({ txData }) => {
      const { id } = txData;
      await dispatch(editExistingTransaction(AssetType.token, id.toString()));
      await dispatch(clearConfirmTransaction());
      await dispatch(showSendTokenPage());
    },
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ConfirmSendToken);
