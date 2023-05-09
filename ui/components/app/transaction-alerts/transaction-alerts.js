import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

import { PriorityLevels } from '../../../../shared/constants/gas';
import { useGasFeeContext } from '../../../contexts/gasFee';
import { SEVERITIES } from '../../../helpers/constants/design-system';
import ZENDESK_URLS from '../../../helpers/constants/zendesk-url';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { submittedPendingTransactionsSelector } from '../../../selectors';
import { BannerAlert, ButtonLink, Text } from '../../component-library';
import SimulationErrorMessage from '../../ui/simulation-error-message';

const TransactionAlerts = ({
  userAcknowledgedGasMissing,
  setUserAcknowledgedGasMissing,
}) => {
  const { estimateUsed, hasSimulationError, supportsEIP1559, isNetworkBusy } =
    useGasFeeContext();
  const pendingTransactions = useSelector(submittedPendingTransactionsSelector);
  const t = useI18nContext();

  return (
    <div className="transaction-alerts">
      {supportsEIP1559 && hasSimulationError && (
        <SimulationErrorMessage
          userAcknowledgedGasMissing={userAcknowledgedGasMissing}
          setUserAcknowledgedGasMissing={setUserAcknowledgedGasMissing}
        />
      )}
      {supportsEIP1559 && pendingTransactions?.length > 0 && (
        <BannerAlert severity={SEVERITIES.WARNING}>
          <Text as="p">
            <strong>
              {pendingTransactions?.length === 1
                ? t('pendingTransactionSingle', [pendingTransactions?.length])
                : t('pendingTransactionMultiple', [
                    pendingTransactions?.length,
                  ])}
            </strong>{' '}
            {t('pendingTransactionInfo')}
            {t('learnCancelSpeeedup', [
              <ButtonLink
                key="cancelSpeedUpInfo"
                href={ZENDESK_URLS.SPEEDUP_CANCEL}
                rel="noopener noreferrer"
                target="_blank"
              >
                {t('cancelSpeedUp')}
              </ButtonLink>,
            ])}
          </Text>
        </BannerAlert>
      )}
      {estimateUsed === PriorityLevels.low && (
        <BannerAlert
          data-testid="low-gas-fee-alert"
          severity={SEVERITIES.WARNING}
        >
          {t('lowPriorityMessage')}
        </BannerAlert>
      )}
      {supportsEIP1559 && isNetworkBusy ? (
        <BannerAlert severity={SEVERITIES.WARNING}>
          {t('networkIsBusy')}
        </BannerAlert>
      ) : null}
    </div>
  );
};

TransactionAlerts.propTypes = {
  userAcknowledgedGasMissing: PropTypes.bool,
  setUserAcknowledgedGasMissing: PropTypes.func,
};

export default TransactionAlerts;
