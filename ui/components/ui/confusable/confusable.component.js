import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { confusables } from 'unicode-confusables';

import { useI18nContext } from '../../../hooks/useI18nContext';
import Tooltip from '../tooltip';

const Confusable = ({ input }) => {
  const t = useI18nContext();
  const confusableData = useMemo(() => {
    return confusables(input);
  }, [input]);

  return confusableData.map(({ point, similarTo }, index) => {
    const zeroWidth = similarTo === '';
    if (similarTo === undefined) {
      return point;
    }
    return (
      <Tooltip
        key={index.toString()}
        tag="span"
        position="top"
        title={
          zeroWidth
            ? t('confusableZeroWidthUnicode')
            : t('confusableUnicode', [point, similarTo])
        }
      >
        <span className="confusable__point">{zeroWidth ? '?' : point}</span>
      </Tooltip>
    );
  });
};

Confusable.propTypes = {
  input: PropTypes.string.isRequired,
};

export default Confusable;
