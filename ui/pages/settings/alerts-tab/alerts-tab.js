import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { AlertTypes } from '../../../../shared/constants/alerts';
import ToggleButton from '../../../components/ui/toggle-button';
import Tooltip from '../../../components/ui/tooltip';
import { getAlertEnabledness } from '../../../ducks/metamask/metamask';
import { handleSettingsRefs } from '../../../helpers/utils/settings-search';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { setAlertEnabledness } from '../../../store/actions';

const AlertSettingsEntry = ({ alertId, description, title }) => {
  const t = useI18nContext();
  const settingsRefs = useRef();

  useEffect(() => {
    handleSettingsRefs(t, t('alerts'), settingsRefs);
  }, [settingsRefs, t]);

  const isEnabled = useSelector((state) => getAlertEnabledness(state)[alertId]);

  return (
    <>
      <div ref={settingsRefs} className="alerts-tab__item">
        <span>{title}</span>
        <div className="alerts-tab__description-container">
          <Tooltip
            position="top"
            title={description}
            wrapperClassName="alerts-tab__description"
          >
            <i className="fa fa-info-circle alerts-tab__description__icon" />
          </Tooltip>
          <ToggleButton
            offLabel={t('off')}
            onLabel={t('on')}
            onToggle={() => setAlertEnabledness(alertId, !isEnabled)}
            value={isEnabled}
          />
        </div>
      </div>
    </>
  );
};

AlertSettingsEntry.propTypes = {
  alertId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const AlertsTab = () => {
  const t = useI18nContext();

  const alertConfig = {
    [AlertTypes.unconnectedAccount]: {
      title: t('alertSettingsUnconnectedAccount'),
      description: t('alertSettingsUnconnectedAccountDescription'),
    },
    [AlertTypes.web3ShimUsage]: {
      title: t('alertSettingsWeb3ShimUsage'),
      description: t('alertSettingsWeb3ShimUsageDescription'),
    },
  };

  return (
    <div className="alerts-tab__body">
      {Object.entries(alertConfig).map(
        ([alertId, { title, description }], _) => (
          <AlertSettingsEntry
            alertId={alertId}
            description={description}
            key={alertId}
            title={title}
          />
        ),
      )}
    </div>
  );
};

export default AlertsTab;
