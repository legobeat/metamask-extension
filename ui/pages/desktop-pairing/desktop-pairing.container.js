import { connect } from 'react-redux';

import { getMostRecentOverviewPage } from '../../ducks/history/history';
import {
  generateDesktopOtp,
  hideLoadingIndication,
  showLoadingIndication,
} from '../../store/actions';
import DesktopPairingPage from './desktop-pairing.component';

const mapDispatchToProps = (dispatch) => {
  return {
    generateDesktopOtp: () => generateDesktopOtp(),
    showLoadingIndication: () => dispatch(showLoadingIndication()),
    hideLoadingIndication: () => dispatch(hideLoadingIndication()),
  };
};

const mapStateToProps = (state) => {
  return {
    mostRecentOverviewPage: getMostRecentOverviewPage(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopPairingPage);
