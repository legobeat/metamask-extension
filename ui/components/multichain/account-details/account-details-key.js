import PropTypes from 'prop-types';
import React from 'react';

import {
  AlignItems,
  BorderColor,
  BorderRadius,
  DISPLAY,
  FLEX_DIRECTION,
  SEVERITIES,
  TextVariant,
} from '../../../helpers/constants/design-system';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  BannerAlert,
  ButtonIcon,
  ButtonPrimary,
  IconName,
  Text,
} from '../../component-library';
import Box from '../../ui/box/box';

export const AccountDetailsKey = ({ accountName, onClose, privateKey }) => {
  const t = useI18nContext();

  const [privateKeyCopied, handlePrivateKeyCopy] = useCopyToClipboard();

  return (
    <>
      <Text
        marginTop={6}
        variant={TextVariant.bodySm}
        style={{ wordBreak: 'break-word' }}
      >
        {t('privateKeyCopyWarning', [accountName])}
      </Text>
      <Box
        display={DISPLAY.FLEX}
        flexDirection={FLEX_DIRECTION.ROW}
        alignItems={AlignItems.center}
        borderRadius={BorderRadius.SM}
        borderWidth={1}
        borderColor={BorderColor.default}
        padding={4}
        gap={4}
      >
        <Text variant={TextVariant.bodySm} style={{ wordBreak: 'break-word' }}>
          {privateKey}
        </Text>
        <ButtonIcon
          onClick={() => handlePrivateKeyCopy(privateKey)}
          iconName={privateKeyCopied ? IconName.CopySuccess : IconName.Copy}
        />
      </Box>
      <BannerAlert severity={SEVERITIES.DANGER} marginTop={4}>
        <Text variant={TextVariant.bodySm}>{t('privateKeyWarning')}</Text>
      </BannerAlert>
      <ButtonPrimary marginTop={6} onClick={onClose}>
        {t('done')}
      </ButtonPrimary>
    </>
  );
};

AccountDetailsKey.propTypes = {
  accountName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  privateKey: PropTypes.string.isRequired,
};
