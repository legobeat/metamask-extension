import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { Numeric } from '../../../../shared/modules/Numeric';
import { I18nContext } from '../../../contexts/i18n';
import {
  AlignItems,
  DISPLAY,
  FLEX_DIRECTION,
  TextVariant,
  TextAlign,
  Size,
  BackgroundColor,
  TextColor,
  IconColor,
} from '../../../helpers/constants/design-system';
import {
  ButtonLink,
  Icon,
  IconName,
  IconSize,
  Text,
} from '../../component-library';
import Box from '../box';
import Tooltip from '../tooltip';

export default function ReviewSpendingCap({
  tokenName,
  currentTokenBalance,
  tokenValue,
  onEdit,
}) {
  const t = useContext(I18nContext);
  const valueIsGreaterThanBalance = new Numeric(
    Number(tokenValue),
    10,
  ).greaterThan(Number(currentTokenBalance), 10);

  return (
    <Box
      className="review-spending-cap"
      borderRadius={Size.SM}
      paddingTop={4}
      paddingRight={4}
      paddingLeft={4}
      display={DISPLAY.FLEX}
      alignItems={AlignItems.flexStart}
      flexDirection={FLEX_DIRECTION.COLUMN}
      backgroundColor={BackgroundColor.backgroundAlternative}
      gap={1}
    >
      <Box
        flexDirection={FLEX_DIRECTION.ROW}
        display={DISPLAY.FLEX}
        alignItems={AlignItems.center}
        className="review-spending-cap__heading"
      >
        <Box
          flexDirection={FLEX_DIRECTION.ROW}
          className="review-spending-cap__heading-title"
        >
          <Text
            variant={TextVariant.bodySmBold}
            as="h6"
            display={DISPLAY.INLINE_BLOCK}
          >
            {t('customSpendingCap')}
          </Text>
          <Box marginLeft={2} display={DISPLAY.INLINE_BLOCK}>
            <Tooltip
              interactive
              position="top"
              html={
                <Text
                  variant={TextVariant.bodySmBold}
                  as="h6"
                  color={TextColor.textAlternative}
                  className="review-spending-cap__heading-title__tooltip"
                >
                  {valueIsGreaterThanBalance &&
                    t('warningTooltipText', [
                      <Text
                        key="tooltip-text"
                        variant={TextVariant.bodySmBold}
                        as="h6"
                        color={TextColor.errorDefault}
                      >
                        <Icon
                          name={IconName.Warning}
                          style={{ verticalAlign: 'middle' }}
                        />
                        {t('beCareful')}
                      </Text>,
                    ])}
                  {Number(tokenValue) === 0 &&
                    t('revokeSpendingCapTooltipText')}
                </Text>
              }
            >
              {valueIsGreaterThanBalance && (
                <Icon
                  className="review-spending-cap__heading-title__tooltip__warning-icon"
                  name={IconName.Danger}
                  color={IconColor.errorDefault}
                  size={IconSize.Sm}
                  style={{ 'vertical-align': 'middle' }}
                />
              )}
              {Number(tokenValue) === 0 && (
                <Icon
                  className="review-spending-cap__heading-title__tooltip__question-icon"
                  name={IconName.Question}
                  color={IconColor.iconDefault}
                />
              )}
            </Tooltip>
          </Box>
        </Box>
        <Box
          className="review-spending-cap__heading-detail"
          textAlign={TextAlign.End}
        >
          <ButtonLink
            size={Size.auto}
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
          >
            {t('edit')}
          </ButtonLink>
        </Box>
      </Box>
      <Box className="review-spending-cap__value">
        <Text
          color={
            valueIsGreaterThanBalance
              ? TextColor.errorDefault
              : TextColor.textDefault
          }
          variant={TextVariant.bodySmBold}
          as="h6"
          marginBottom={3}
        >
          {tokenValue} {tokenName}
        </Text>
      </Box>
    </Box>
  );
}

ReviewSpendingCap.propTypes = {
  tokenName: PropTypes.string,
  currentTokenBalance: PropTypes.string,
  tokenValue: PropTypes.string,
  onEdit: PropTypes.func,
};
