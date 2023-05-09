import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import {
  downloadDesktopApp,
  downloadExtension,
  restartExtension,
} from '../../../shared/lib/error-utils';
import { MetaMetricsContext } from '../../contexts/metametrics';
import { DEFAULT_ROUTE } from '../../helpers/constants/routes';
import { useI18nContext } from '../../hooks/useI18nContext';
import { renderDesktopError } from './render-desktop-error';

export default function DesktopError({ forceDisableDesktop }) {
  const t = useI18nContext();
  const { errorType } = useParams();
  const history = useHistory();
  const trackEvent = useContext(MetaMetricsContext);

  return renderDesktopError({
    type: errorType,
    t,
    isHtmlError: false,
    history,
    disableDesktop: () => {
      forceDisableDesktop();
      history.push(DEFAULT_ROUTE);
    },
    downloadDesktopApp,
    downloadExtension,
    restartExtension,
    trackEvent,
  });
}
