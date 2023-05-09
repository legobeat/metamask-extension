import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useMemo, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import {
  ThreeStepProgressBar,
  threeStepStages,
} from '../../../components/app/step-progress-bar';
import Box from '../../../components/ui/box';
import Button from '../../../components/ui/button';
import Typography from '../../../components/ui/typography';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import {
  TEXT_ALIGN,
  TypographyVariant,
  JustifyContent,
  FONT_WEIGHT,
} from '../../../helpers/constants/design-system';
import { ONBOARDING_COMPLETION_ROUTE } from '../../../helpers/constants/routes';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { setSeedPhraseBackedUp } from '../../../store/actions';
import RecoveryPhraseChips from './recovery-phrase-chips';

export default function ConfirmRecoveryPhrase({ secretRecoveryPhrase = '' }) {
  const history = useHistory();
  const t = useI18nContext();
  const dispatch = useDispatch();
  const splitSecretRecoveryPhrase = secretRecoveryPhrase.split(' ');
  const indicesToCheck = [2, 3, 7];
  const [matching, setMatching] = useState(false);
  const trackEvent = useContext(MetaMetricsContext);

  // Removes seed phrase words from chips corresponding to the
  // indicesToCheck so that user has to complete the phrase and confirm
  // they have saved it.
  const initializePhraseElements = () => {
    const phraseElements = { ...splitSecretRecoveryPhrase };
    indicesToCheck.forEach((i) => {
      phraseElements[i] = '';
    });
    return phraseElements;
  };
  const [phraseElements, setPhraseElements] = useState(
    initializePhraseElements(),
  );

  const validate = useMemo(
    () =>
      debounce((elements) => {
        setMatching(Object.values(elements).join(' ') === secretRecoveryPhrase);
      }, 500),
    [setMatching, secretRecoveryPhrase],
  );

  const handleSetPhraseElements = (values) => {
    setPhraseElements(values);
    validate(values);
  };

  return (
    <div
      className="recovery-phrase__confirm"
      data-testid="confirm-recovery-phrase"
    >
      <ThreeStepProgressBar
        stage={threeStepStages.RECOVERY_PHRASE_CONFIRM}
        marginBottom={4}
      />
      <Box
        justifyContent={JustifyContent.center}
        textAlign={TEXT_ALIGN.CENTER}
        marginBottom={4}
      >
        <Typography
          variant={TypographyVariant.H2}
          fontWeight={FONT_WEIGHT.BOLD}
        >
          {t('seedPhraseConfirm')}
        </Typography>
      </Box>
      <Box
        justifyContent={JustifyContent.center}
        textAlign={TEXT_ALIGN.CENTER}
        marginBottom={4}
      >
        <Typography variant={TypographyVariant.H4}>
          {t('seedPhraseEnterMissingWords')}
        </Typography>
      </Box>
      <RecoveryPhraseChips
        secretRecoveryPhrase={splitSecretRecoveryPhrase}
        confirmPhase
        setInputValue={handleSetPhraseElements}
        inputValue={phraseElements}
        indicesToCheck={indicesToCheck}
      />
      <div className="recovery-phrase__footer__confirm">
        <Button
          data-testid="recovery-phrase-confirm"
          type="primary"
          large
          className="recovery-phrase__footer__confirm--button"
          onClick={async () => {
            await dispatch(setSeedPhraseBackedUp(true));
            trackEvent({
              category: MetaMetricsEventCategory.Onboarding,
              event:
                MetaMetricsEventName.OnboardingWalletSecurityPhraseConfirmed,
            });
            history.push(ONBOARDING_COMPLETION_ROUTE);
          }}
          disabled={!matching}
        >
          {t('confirm')}
        </Button>
      </div>
    </div>
  );
}

ConfirmRecoveryPhrase.propTypes = {
  secretRecoveryPhrase: PropTypes.string,
};
