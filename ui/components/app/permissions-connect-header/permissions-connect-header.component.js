import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  FLEX_DIRECTION,
  JustifyContent,
} from '../../../helpers/constants/design-system';
import Box from '../../ui/box';
import SiteOrigin from '../../ui/site-origin';
///: BEGIN:ONLY_INCLUDE_IN(snaps)
import SnapAuthorship from '../snaps/snap-authorship';
///: END:ONLY_INCLUDE_IN

export default class PermissionsConnectHeader extends Component {
  ///: BEGIN:ONLY_INCLUDE_IN(snaps)
  static contextTypes = {
    t: PropTypes.func,
  };
  ///: END:ONLY_INCLUDE_IN

  static propTypes = {
    className: PropTypes.string,
    iconUrl: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    siteOrigin: PropTypes.string.isRequired,
    headerTitle: PropTypes.node,
    boxProps: PropTypes.shape({ ...Box.propTypes }),
    headerText: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    ///: BEGIN:ONLY_INCLUDE_IN(snaps)
    snapVersion: PropTypes.string,
    isSnapInstallOrUpdate: PropTypes.bool,
    ///: END:ONLY_INCLUDE_IN
  };

  static defaultProps = {
    iconUrl: null,
    headerTitle: '',
    headerText: '',
    boxProps: {},
  };

  renderHeaderIcon() {
    const {
      iconUrl,
      iconName,
      siteOrigin,
      leftIcon,
      rightIcon,
      ///: BEGIN:ONLY_INCLUDE_IN(snaps)
      isSnapInstallOrUpdate,
      ///: END:ONLY_INCLUDE_IN
    } = this.props;

    ///: BEGIN:ONLY_INCLUDE_IN(snaps)
    if (isSnapInstallOrUpdate) {
      return null;
    }
    ///: END:ONLY_INCLUDE_IN

    return (
      <div className="permissions-connect-header__icon">
        <SiteOrigin
          chip
          siteOrigin={siteOrigin}
          title={siteOrigin}
          iconSrc={iconUrl}
          name={iconName}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
        />
      </div>
    );
  }

  render() {
    const {
      boxProps,
      className,
      headerTitle,
      headerText,
      ///: BEGIN:ONLY_INCLUDE_IN(snaps)
      siteOrigin,
      isSnapInstallOrUpdate,
      ///: END:ONLY_INCLUDE_IN
    } = this.props;
    return (
      <Box
        className={classnames('permissions-connect-header', className)}
        flexDirection={FLEX_DIRECTION.COLUMN}
        justifyContent={JustifyContent.center}
        {...boxProps}
      >
        {this.renderHeaderIcon()}
        <div className="permissions-connect-header__title">{headerTitle}</div>
        {
          ///: BEGIN:ONLY_INCLUDE_IN(snaps)
          isSnapInstallOrUpdate && <SnapAuthorship snapId={siteOrigin} />
          ///: END:ONLY_INCLUDE_IN
        }
        <div className="permissions-connect-header__subtitle">{headerText}</div>
      </Box>
    );
  }
}
