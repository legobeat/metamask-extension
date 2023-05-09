import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import AccountMenu from '.';
import { KeyringType } from '../../../../shared/constants/keyring';
import { renderWithProvider } from '../../../../test/lib/render-helpers';

const initialProps = {
  isAccountMenuOpen: true,
  addressConnectedSubjectMap: {},
  accounts: [
    {
      address: '0x00',
      name: 'Account 1',
      balance: '0x0',
    },
    {
      address: '0x1',
      name: 'Imported Account 1',
      balance: '0x0',
    },
  ],
  keyrings: [
    {
      type: KeyringType.hdKeyTree,
      accounts: ['0xAdress'],
    },
    {
      type: KeyringType.imported,
      accounts: ['0x1'],
    },
  ],
  prevIsAccountMenuOpen: false,
  lockMetamask: sinon.spy(),
  setSelectedAccount: sinon.spy(),
  showRemoveAccountConfirmationModal: sinon.spy(),
  toggleAccountMenu: sinon.spy(),
  history: {
    push: sinon.spy(),
  },
};

const mockStore = {
  metamask: {
    providerConfig: {
      type: 'test',
    },
    preferences: {
      useNativeCurrencyAsPrimaryCurrency: true,
    },
  },
};

const renderComponent = ({ props = initialProps } = {}) => {
  const store = configureMockStore()(mockStore);
  return renderWithProvider(<AccountMenu.WrappedComponent {...props} />, store);
};

describe('Account Menu', () => {
  beforeEach(() => renderComponent());

  afterEach(() => {
    initialProps.toggleAccountMenu.resetHistory();
    initialProps.history.push.resetHistory();
  });

  describe('Render Content', () => {
    it('returns account name from identities', () => {
      const accountName = screen.queryAllByTestId('account-menu__account');
      expect(accountName).toHaveLength(2);
    });

    it('renders user preference currency display balance from account balance', () => {
      const accountBalance = screen.queryAllByTestId('account-menu__balance');

      expect(accountBalance).toHaveLength(2);
    });

    it('simulate click', () => {
      const click = screen.getAllByTestId('account-menu__account');
      fireEvent.click(click[0]);

      expect(initialProps.setSelectedAccount.calledOnce).toStrictEqual(true);
      expect(initialProps.setSelectedAccount.getCall(0).args[0]).toStrictEqual(
        '0x00',
      );
    });

    it('render imported account label', () => {
      const importedAccount = screen.getByText('Imported');
      expect(importedAccount).toBeInTheDocument();
    });

    it('should not render keyring label if keyring tyoe is Custody - JSONRPC', () => {
      const props = {
        ...initialProps,
        keyrings: [
          {
            type: 'Custody - JSONRPC',
            accounts: ['0xAdress'],
          },
          {
            type: 'Custody - JSONRPC',
            accounts: ['0x1'],
          },
        ],
      };

      const { container } = renderComponent({ props });

      expect(container).toMatchSnapshot();
    });
  });

  describe('Log Out', () => {
    it('logout', () => {
      const logout = screen.getByText('Lock');
      expect(logout).toBeInTheDocument();
    });

    it('simulate click', () => {
      const logout = screen.getByText('Lock');
      fireEvent.click(logout);
      expect(initialProps.lockMetamask.calledOnce).toStrictEqual(true);
      expect(initialProps.history.push.getCall(0).args[0]).toStrictEqual('/');
    });
  });

  describe('Create Account', () => {
    it('renders create account item', () => {
      const createAccount = screen.getByText('Create account');
      expect(createAccount).toBeInTheDocument();
    });

    it('calls toggle menu and push new-account route to history', () => {
      const createAccount = screen.getByText('Create account');
      fireEvent.click(createAccount);
      expect(initialProps.toggleAccountMenu.calledOnce).toStrictEqual(true);
      expect(initialProps.history.push.getCall(0).args[0]).toStrictEqual(
        '/new-account',
      );
    });
  });

  describe('Import Account', () => {
    it('renders import account item', () => {
      const importAccount = screen.getByText('Import account');
      expect(importAccount).toBeInTheDocument();
    });

    it('calls toggle menu and push /new-account/import route to history', () => {
      const importAccount = screen.getByText('Import account');
      fireEvent.click(importAccount);
      expect(initialProps.toggleAccountMenu.calledOnce).toStrictEqual(true);
      expect(initialProps.history.push.getCall(0).args[0]).toStrictEqual(
        '/new-account/import',
      );
    });
  });

  describe('Connect hardware wallet', () => {
    it('renders import account item', () => {
      const connectHardwareWallet = screen.getByText('Connect hardware wallet');
      expect(connectHardwareWallet).toBeInTheDocument();
    });

    it('calls toggle menu and push /new-account/connect route to history', () => {
      const connectHardwareWallet = screen.getByText('Connect hardware wallet');
      fireEvent.click(connectHardwareWallet);
      expect(initialProps.toggleAccountMenu.calledOnce).toStrictEqual(true);
      expect(initialProps.history.push.getCall(0).args[0]).toStrictEqual(
        '/new-account/connect',
      );
    });
  });

  describe('Support', () => {
    global.platform = { openTab: sinon.spy() };

    it('renders import account item', () => {
      const support = screen.getByText('Submit a ticket');
      expect(support).toBeInTheDocument();
    });

    it('opens support link when clicked', () => {
      const support = screen.getByText('Submit a ticket');
      fireEvent.click(support);
      expect(global.platform.openTab.calledOnce).toStrictEqual(true);
    });
  });

  describe('Settings', () => {
    it('renders import account item', () => {
      const settings = screen.getByText('Settings');
      expect(settings).toBeInTheDocument();
    });

    it('calls toggle menu and push /new-account/connect route to history', () => {
      const settings = screen.getByText('Settings');
      fireEvent.click(settings);
      expect(initialProps.toggleAccountMenu.calledOnce).toStrictEqual(true);
      expect(initialProps.history.push.getCall(0).args[0]).toStrictEqual(
        '/settings',
      );
    });
  });
});
