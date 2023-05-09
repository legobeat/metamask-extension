import Fuse from 'fuse.js';
import PropTypes from 'prop-types';
import React, { useState, useContext, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// TODO: Replace ICON_NAMES with IconName when ButtonBase/Buttons have been updated
import { AccountListItem } from '..';
import { getEnvironmentType } from '../../../../app/scripts/lib/util';
import { ENVIRONMENT_TYPE_POPUP } from '../../../../shared/constants/app';
import {
  MetaMetricsEventAccountType,
  MetaMetricsEventCategory,
  MetaMetricsEventName,
} from '../../../../shared/constants/metametrics';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import {
  BLOCK_SIZES,
  Size,
  TextColor,
} from '../../../helpers/constants/design-system';
import {
  IMPORT_ACCOUNT_ROUTE,
  NEW_ACCOUNT_ROUTE,
  CONNECT_HARDWARE_ROUTE,
} from '../../../helpers/constants/routes';
import { useI18nContext } from '../../../hooks/useI18nContext';
import {
  getSelectedAccount,
  getMetaMaskAccountsOrdered,
  getConnectedSubjectsForAllAddresses,
  getOriginOfCurrentTab,
} from '../../../selectors';
import { toggleAccountMenu, setSelectedAccount } from '../../../store/actions';
import { ButtonLink, TextFieldSearch, Text } from '../../component-library';
import { ICON_NAMES } from '../../component-library/icon/deprecated';
import Box from '../../ui/box/box';
import Popover from '../../ui/popover';

export const AccountListMenu = ({ onClose }) => {
  const t = useI18nContext();
  const trackEvent = useContext(MetaMetricsContext);
  const accounts = useSelector(getMetaMaskAccountsOrdered);
  const selectedAccount = useSelector(getSelectedAccount);
  const connectedSites = useSelector(getConnectedSubjectsForAllAddresses);
  const currentTabOrigin = useSelector(getOriginOfCurrentTab);
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [searchQuery, setSearchQuery] = useState('');

  let searchResults = accounts;
  if (searchQuery) {
    const fuse = new Fuse(accounts, {
      threshold: 0.2,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'address'],
    });
    fuse.setCollection(accounts);
    searchResults = fuse.search(searchQuery);
  }

  // Focus on the search box when the popover is opened
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.rootNode.querySelector('input[type=search]').focus();
    }
  }, [inputRef]);

  return (
    <Popover
      title={t('selectAnAccount')}
      ref={inputRef}
      centerTitle
      onClose={onClose}
    >
      <Box className="multichain-account-menu">
        {/* Search box */}
        {accounts.length > 1 ? (
          <Box
            paddingLeft={4}
            paddingRight={4}
            paddingBottom={4}
            paddingTop={0}
          >
            <TextFieldSearch
              size={Size.SM}
              width={BLOCK_SIZES.FULL}
              placeholder={t('searchAccounts')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              clearButtonOnClick={() => setSearchQuery('')}
              clearButtonProps={{
                size: Size.SM,
              }}
            />
          </Box>
        ) : null}
        {/* Account list block */}
        <Box className="multichain-account-menu__list">
          {searchResults.length === 0 && searchQuery !== '' ? (
            <Text
              paddingLeft={4}
              paddingRight={4}
              color={TextColor.textMuted}
              data-testid="multichain-account-menu-no-results"
            >
              {t('noAccountsFound')}
            </Text>
          ) : null}
          {searchResults.map((account) => {
            const connectedSite = connectedSites[account.address]?.find(
              ({ origin }) => origin === currentTabOrigin,
            );

            return (
              <AccountListItem
                onClick={() => {
                  dispatch(toggleAccountMenu());
                  trackEvent({
                    category: MetaMetricsEventCategory.Navigation,
                    event: MetaMetricsEventName.NavAccountSwitched,
                    properties: {
                      location: 'Main Menu',
                    },
                  });
                  dispatch(setSelectedAccount(account.address));
                }}
                identity={account}
                key={account.address}
                selected={selectedAccount.address === account.address}
                closeMenu={onClose}
                connectedAvatar={connectedSite?.iconUrl}
                connectedAvatarName={connectedSite?.name}
              />
            );
          })}
        </Box>
        {/* Add / Import / Hardware */}
        <Box padding={4}>
          <Box marginBottom={4}>
            <ButtonLink
              size={Size.SM}
              startIconName={ICON_NAMES.ADD}
              onClick={() => {
                dispatch(toggleAccountMenu());
                trackEvent({
                  category: MetaMetricsEventCategory.Navigation,
                  event: MetaMetricsEventName.AccountAddSelected,
                  properties: {
                    account_type: MetaMetricsEventAccountType.Default,
                    location: 'Main Menu',
                  },
                });
                history.push(NEW_ACCOUNT_ROUTE);
              }}
            >
              {t('addAccount')}
            </ButtonLink>
          </Box>
          <Box marginBottom={4}>
            <ButtonLink
              size={Size.SM}
              startIconName={ICON_NAMES.IMPORT}
              onClick={() => {
                dispatch(toggleAccountMenu());
                trackEvent({
                  category: MetaMetricsEventCategory.Navigation,
                  event: MetaMetricsEventName.AccountAddSelected,
                  properties: {
                    account_type: MetaMetricsEventAccountType.Imported,
                    location: 'Main Menu',
                  },
                });
                history.push(IMPORT_ACCOUNT_ROUTE);
              }}
            >
              {t('importAccount')}
            </ButtonLink>
          </Box>
          <Box>
            <ButtonLink
              size={Size.SM}
              startIconName={ICON_NAMES.HARDWARE}
              onClick={() => {
                dispatch(toggleAccountMenu());
                trackEvent({
                  category: MetaMetricsEventCategory.Navigation,
                  event: MetaMetricsEventName.AccountAddSelected,
                  properties: {
                    account_type: MetaMetricsEventAccountType.Hardware,
                    location: 'Main Menu',
                  },
                });
                if (getEnvironmentType() === ENVIRONMENT_TYPE_POPUP) {
                  global.platform.openExtensionInBrowser(
                    CONNECT_HARDWARE_ROUTE,
                  );
                } else {
                  history.push(CONNECT_HARDWARE_ROUTE);
                }
              }}
            >
              {t('hardwareWallet')}
            </ButtonLink>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

AccountListMenu.propTypes = {
  /**
   * Function that executes when the menu closes
   */
  onClose: PropTypes.func.isRequired,
};
