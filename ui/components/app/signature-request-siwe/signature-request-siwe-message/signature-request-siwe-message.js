import PropTypes from 'prop-types';
import React from 'react';

import {
  FLEX_DIRECTION,
  OVERFLOW_WRAP,
  TextVariant,
} from '../../../../helpers/constants/design-system';
import { Text } from '../../../component-library';
import Box from '../../../ui/box';

const SignatureRequestSIWEMessage = ({ data }) => {
  return (
    <Box className="signature-request-siwe-message">
      <Box flexDirection={FLEX_DIRECTION.COLUMN}>
        {data.map(({ label, value }, i) => (
          <Box key={i.toString()} marginTop={2} marginBottom={2}>
            <Text
              as="h4"
              variant={TextVariant.bodyLgMedium}
              marginTop={2}
              marginBottom={2}
            >
              {label}
            </Text>
            <Text
              className="signature-request-siwe-message__sub-text"
              overflowWrap={OVERFLOW_WRAP.BREAK_WORD}
              marginTop={2}
              marginBottom={2}
            >
              {value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

SignatureRequestSIWEMessage.propTypes = {
  /**
   * The data array that contains objects of data about the message
   */
  data: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The label or title of the value data
       */
      label: PropTypes.string,
      /**
       * The value of the data
       */
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
};

export default React.memo(SignatureRequestSIWEMessage);
