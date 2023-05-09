import PropTypes from 'prop-types';
import React from 'react';

import { useTokenTracker } from '../../../hooks/useTokenTracker';
import CurrencyDisplay from '../currency-display';

export default function TokenBalance({ className, token }) {
  const { tokensWithBalances } = useTokenTracker([token]);

  const { string, symbol } = tokensWithBalances[0] || {};
  return (
    <CurrencyDisplay
      className={className}
      displayValue={string || ''}
      suffix={symbol || ''}
    />
  );
}

TokenBalance.propTypes = {
  className: PropTypes.string,
  token: PropTypes.shape({
    address: PropTypes.string.isRequired,
    decimals: PropTypes.number,
    symbol: PropTypes.string,
  }).isRequired,
};

TokenBalance.defaultProps = {
  className: undefined,
};
