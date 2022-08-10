import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '../typography/typography';
import Box from '../box/box';
import Tooltip from '../tooltip/tooltip';
import {
  COLORS,
  TEXT_ALIGN,
  DISPLAY,
  TYPOGRAPHY,
  FONT_WEIGHT,
} from '../../../helpers/constants/design-system';

import NumericInput from '../numeric-input/numeric-input.component';
import InfoTooltip from '../info-tooltip/info-tooltip';

export default function FormField({
  dataTestId,
  titleText,
  titleUnit,
  tooltipText,
  tooltipIcon,
  tooltipContentText,
  coloredValue,
  titleDetail,
  error,
  onChange,
  value,
  numeric,
  detailText,
  autoFocus,
  password,
  allowDecimals,
  disabled,
  placeholder,
  warning,
  passwordStrength,
  passwordStrengthText,
  customSpendingCupText,
  maxButton,
}) {
  return (
    <div
      className={classNames('form-field', {
        'form-field__row--error': error,
      })}
    >
      <label>
        <div className="form-field__heading">
          <div className="form-field__heading-title">
            {titleText && (
              <Typography
                tag={TYPOGRAPHY.H6}
                fontWeight={FONT_WEIGHT.BOLD}
                variant={TYPOGRAPHY.H6}
                boxProps={{ display: DISPLAY.INLINE_BLOCK }}
              >
                {titleText}
              </Typography>
            )}
            {titleUnit && (
              <Typography
                tag={TYPOGRAPHY.H6}
                variant={TYPOGRAPHY.H6}
                color={COLORS.TEXT_ALTERNATIVE}
                boxProps={{ display: DISPLAY.INLINE_BLOCK }}
              >
                {titleUnit}
              </Typography>
            )}
            {tooltipText && (
              <InfoTooltip position="top" contentText={tooltipText} />
            )}
            {tooltipContentText && (
              <Box display={DISPLAY.INLINE_BLOCK}>
                <Tooltip
                  interactive
                  position="top"
                  html={
                    <Box
                      margin={3}
                      className="form-field__heading-title__tooltip"
                    >
                      {tooltipContentText}
                    </Box>
                  }
                >
                  {tooltipIcon ? (
                    <i className="fa fa-exclamation-triangle form-field__heading-title__tooltip__warning-icon" />
                  ) : (
                    <i className="fa fa-question-circle form-field__heading-title__tooltip__question-icon" />
                  )}
                </Tooltip>
              </Box>
            )}
          </div>
          {titleDetail && (
            <Box
              className="form-field__heading-detail"
              textAlign={TEXT_ALIGN.END}
              marginBottom={customSpendingCupText || tooltipContentText ? 2 : 3}
              marginRight={customSpendingCupText || tooltipContentText ? 0 : 2}
            >
              {titleDetail}
            </Box>
          )}
        </div>
        {numeric ? (
          <NumericInput
            error={error}
            onChange={onChange}
            value={value}
            detailText={detailText}
            autoFocus={autoFocus}
            allowDecimals={allowDecimals}
            disabled={disabled}
            dataTestId={dataTestId}
            placeholder={placeholder}
          />
        ) : (
          <input
            className={classNames('form-field__input', {
              'form-field__input--error': error,
              'form-field__input--warning': warning,
              'form-field__input--colour-value': coloredValue,
              'form-field__input--max-button': maxButton,
            })}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            type={password ? 'password' : 'text'}
            autoFocus={autoFocus}
            disabled={disabled}
            data-testid={dataTestId}
            placeholder={placeholder}
          />
        )}
        {maxButton}
        {error && (
          <Typography
            color={COLORS.ERROR_DEFAULT}
            variant={TYPOGRAPHY.H7}
            className="form-field__error"
          >
            {error}
          </Typography>
        )}
        {warning && (
          <Typography
            color={COLORS.TEXT_ALTERNATIVE}
            variant={TYPOGRAPHY.H7}
            className="form-field__warning"
          >
            {warning}
          </Typography>
        )}
        {passwordStrength && (
          <Typography
            color={COLORS.TEXT_DEFAULT}
            variant={TYPOGRAPHY.H7}
            className="form-field__password-strength"
          >
            {passwordStrength}
          </Typography>
        )}
        {passwordStrengthText && (
          <Typography
            color={COLORS.TEXT_ALTERNATIVE}
            variant={TYPOGRAPHY.H8}
            className="form-field__password-strength-text"
          >
            {passwordStrengthText}
          </Typography>
        )}
        {customSpendingCupText && (
          <Typography
            color={COLORS.TEXT_DEFAULT}
            variant={TYPOGRAPHY.H7}
            className="form-field__custom-spending-cup-text"
          >
            {customSpendingCupText}
          </Typography>
        )}
      </label>
    </div>
  );
}

FormField.propTypes = {
  /**
   * Identifier for testing purpose
   */
  dataTestId: PropTypes.string,
  /**
   * Form Fields Title
   */
  titleText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Show unit (eg. ETH)
   */
  titleUnit: PropTypes.string,
  /**
   * Add Tooltip and text content
   */
  tooltipText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Show content (text, image, component) in title
   */
  titleDetail: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Show error message
   */
  error: PropTypes.string,
  /**
   * Show warning message
   */
  warning: PropTypes.string,
  /**
   * Handler when fields change
   */
  onChange: PropTypes.func,
  /**
   * Field value
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Show detail text if field mode is numeric
   */
  detailText: PropTypes.string,
  /**
   * Set autofocus on render
   */
  autoFocus: PropTypes.bool,
  /**
   * Set numeric mode, the default is text
   */
  numeric: PropTypes.bool,
  /**
   * Set password mode
   */
  password: PropTypes.bool,
  /**
   * Allow decimals on the field
   */
  allowDecimals: PropTypes.bool,
  /**
   * Check if the form disabled
   */
  disabled: PropTypes.bool,
  /**
   * Set the placeholder text for the input field
   */
  placeholder: PropTypes.string,
  /**
   * Show password strength according to the score
   */
  passwordStrength: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Show password strength description
   */
  passwordStrengthText: PropTypes.string,
  /**
   * Custom spending cup description
   */
  customSpendingCupText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  /**
   * Max button inside input in CustomSpendingCup component
   */
  maxButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Add Tooltip and text content
   */
  tooltipContentText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Check which tooltip icon to use
   */
  tooltipIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /**
   * Show colored value
   */
  coloredValue: PropTypes.bool,
};

FormField.defaultProps = {
  titleText: '',
  titleUnit: '',
  tooltipText: '',
  titleDetail: '',
  error: '',
  onChange: undefined,
  value: 0,
  detailText: '',
  autoFocus: false,
  numeric: false,
  password: false,
  allowDecimals: true,
  disabled: false,
};
