import copyToClipboard from 'copy-to-clipboard';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

///: BEGIN:ONLY_INCLUDE_IN(build-mmi)
import { getEnvironmentType } from '../../../../app/scripts/lib/util';
import { ENVIRONMENT_TYPE_POPUP } from '../../../../shared/constants/app';
///: END:ONLY_INCLUDE_IN
import { SECOND } from '../../../../shared/constants/time';
import { toChecksumHexAddress } from '../../../../shared/modules/hexstring-utils';
import { IconColor } from '../../../helpers/constants/design-system';
import { shortenAddress } from '../../../helpers/utils/util';
import { Icon, IconName, IconSize } from '../../component-library';
///: BEGIN:ONLY_INCLUDE_IN(build-mmi)
import CustodyLabels from '../../institutional/custody-labels/custody-labels';
///: END:ONLY_INCLUDE_IN
import Tooltip from '../../ui/tooltip';

class SelectedAccount extends Component {
  state = {
    copied: false,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    selectedIdentity: PropTypes.object.isRequired,
    ///: BEGIN:ONLY_INCLUDE_IN(build-mmi)
    accountType: PropTypes.string,
    accountDetails: PropTypes.object,
    provider: PropTypes.object,
    isCustodianSupportedChain: PropTypes.bool,
    ///: END:ONLY_INCLUDE_IN
  };

  componentDidMount() {
    this.copyTimeout = null;
  }

  componentWillUnmount() {
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
      this.copyTimeout = null;
    }
  }

  render() {
    const { t } = this.context;
    const {
      selectedIdentity,
      ///: BEGIN:ONLY_INCLUDE_IN(build-mmi)
      accountType,
      accountDetails,
      provider,
      isCustodianSupportedChain,
      ///: END:ONLY_INCLUDE_IN
    } = this.props;

    const checksummedAddress = toChecksumHexAddress(selectedIdentity.address);

    let title = this.state.copied
      ? t('copiedExclamation')
      : t('copyToClipboard');

    let showAccountCopyIcon = true;

    ///: BEGIN:ONLY_INCLUDE_IN(build-mmi)
    const custodyLabels = accountDetails
      ? accountDetails[toChecksumHexAddress(selectedIdentity.address)]?.labels
      : {};
    const showCustodyLabels =
      getEnvironmentType() !== ENVIRONMENT_TYPE_POPUP &&
      accountType === 'custody' &&
      custodyLabels;

    const tooltipText = this.state.copied
      ? t('copiedExclamation')
      : t('copyToClipboard');

    title = isCustodianSupportedChain
      ? tooltipText
      : t('custodyWrongChain', [provider.nickname || provider.type]);

    showAccountCopyIcon = isCustodianSupportedChain;
    ///: END:ONLY_INCLUDE_IN

    return (
      <div className="selected-account">
        <Tooltip
          wrapperClassName="selected-account__tooltip-wrapper"
          position="bottom"
          title={title}
        >
          <button
            className="selected-account__clickable"
            data-testid="selected-account-click"
            ///: BEGIN:ONLY_INCLUDE_IN(build-mmi)
            disabled={!isCustodianSupportedChain}
            ///: END:ONLY_INCLUDE_IN
            onClick={() => {
              this.setState({ copied: true });
              this.copyTimeout = setTimeout(
                () => this.setState({ copied: false }),
                SECOND * 3,
              );
              copyToClipboard(checksummedAddress);
            }}
          >
            <div className="selected-account__name">
              {selectedIdentity.name}
            </div>
            <div className="selected-account__address">
              {
                ///: BEGIN:ONLY_INCLUDE_IN(build-mmi)
                showCustodyLabels && <CustodyLabels labels={custodyLabels} />
                ///: END:ONLY_INCLUDE_IN
              }
              {shortenAddress(checksummedAddress)}
              {showAccountCopyIcon && (
                <div className="selected-account__copy">
                  <Icon
                    name={
                      this.state.copied ? IconName.COPY_SUCCESS : IconName.COPY
                    }
                    size={IconSize.SM}
                    color={IconColor.iconAlternative}
                  />
                </div>
              )}
              <div className="selected-account__copy">
                <Icon
                  name={
                    this.state.copied ? IconName.CopySuccess : IconName.Copy
                  }
                  size={IconSize.Sm}
                  color={IconColor.iconAlternative}
                />
              </div>
            </div>
          </button>
        </Tooltip>
      </div>
    );
  }
}

export default SelectedAccount;
