import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { getTokens } from '../../../ducks/metamask/metamask';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { useTokenTracker } from '../../../hooks/useTokenTracker';
import { getShouldHideZeroBalanceTokens } from '../../../selectors';
import TokenCell from '../token-cell';

export default function TokenList({ onTokenClick }) {
  const t = useI18nContext();
  const shouldHideZeroBalanceTokens = useSelector(
    getShouldHideZeroBalanceTokens,
  );
  // use `isEqual` comparison function because the token array is serialized
  // from the background so it has a new reference with each background update,
  // even if the tokens haven't changed
  const tokens = useSelector(getTokens, isEqual);
  const { loading, tokensWithBalances } = useTokenTracker(
    tokens,
    true,
    shouldHideZeroBalanceTokens,
  );
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '250px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        {t('loadingTokens')}
      </div>
    );
  }

  return (
    <div>
      {tokensWithBalances.map((tokenData, index) => {
        return <TokenCell key={index} {...tokenData} onClick={onTokenClick} />;
      })}
    </div>
  );
}

TokenList.propTypes = {
  onTokenClick: PropTypes.func.isRequired,
};
