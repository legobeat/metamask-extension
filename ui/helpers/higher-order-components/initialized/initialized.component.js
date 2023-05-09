import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { ONBOARDING_ROUTE } from '../../constants/routes';

export default function Initialized(props) {
  return props.completedOnboarding ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: ONBOARDING_ROUTE }} />
  );
}

Initialized.propTypes = {
  completedOnboarding: PropTypes.bool,
};
