import { connect } from 'react-redux';

import { getMostRecentOverviewPage } from '../../ducks/history/history';
import { getMetaMaskAccountsOrdered } from '../../selectors';
import * as actions from '../../store/actions';
import NewAccountCreateForm from './new-account.component';

const mapStateToProps = (state) => {
  const {
    metamask: { identities = {} },
  } = state;
  const numberOfExistingAccounts = Object.keys(identities).length;
  const newAccountNumber = numberOfExistingAccounts + 1;

  return {
    newAccountNumber,
    mostRecentOverviewPage: getMostRecentOverviewPage(state),
    accounts: getMetaMaskAccountsOrdered(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAccount: (newAccountName) => {
      return dispatch(actions.addNewAccount()).then((newAccountAddress) => {
        if (newAccountName) {
          dispatch(actions.setAccountLabel(newAccountAddress, newAccountName));
        }
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewAccountCreateForm);
