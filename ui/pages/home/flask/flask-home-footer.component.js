import React, { useContext } from 'react';

import {
  MetaMetricsContextProp,
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import { SUPPORT_REQUEST_LINK } from '../../../helpers/constants/common';
import { useI18nContext } from '../../../hooks/useI18nContext';

const FlaskHomeFooter = () => {
  const t = useI18nContext();
  const trackEvent = useContext(MetaMetricsContext);

  return (
    <>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={SUPPORT_REQUEST_LINK}
        onClick={() => {
          trackEvent(
            {
              category: MetaMetricsEventCategory.Footer,
              event: MetaMetricsEventName.SupportLinkClicked,
              properties: {
                url: SUPPORT_REQUEST_LINK,
              },
            },
            {
              contextPropsIntoEventProperties: [
                MetaMetricsContextProp.PageTitle,
              ],
            },
          );
        }}
      >
        {t('needHelpSubmitTicket')}
      </a>{' '}
      |{' '}
      <a
        href="https://community.metamask.io/c/metamask-flask"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('needHelpFeedback')}
      </a>
    </>
  );
};

export default FlaskHomeFooter;
