import React from 'react';
import PropTypes from 'prop-types';

const IconBlockExplorer = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.69449 7.30553L14.3889 1.61108L8.69449 7.30553Z" fill="white" />
    <path d="M14.9446 4.389V1.05566H11.6113" fill="white" />
    <path d="M7.3056 1.05566H5.91671C2.44449 1.05566 1.0556 2.44455 1.0556 5.91678V10.0834C1.0556 13.5557 2.44449 14.9446 5.91671 14.9446H10.0834C13.5556 14.9446 14.9445 13.5557 14.9445 10.0834V8.69455" />
    <path
      d="M8.69449 7.30553L14.3889 1.61108M14.9446 4.389V1.05566H11.6113M7.3056 1.05566H5.91671C2.44449 1.05566 1.0556 2.44455 1.0556 5.91678V10.0834C1.0556 13.5557 2.44449 14.9446 5.91671 14.9446H10.0834C13.5556 14.9446 14.9445 13.5557 14.9445 10.0834V8.69455"
      stroke="#BBC0C5"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

IconBlockExplorer.defaultProps = {
  className: undefined,
};

IconBlockExplorer.propTypes = {
  /**
   * Additional className
   */
  className: PropTypes.string,
};

export default IconBlockExplorer;
