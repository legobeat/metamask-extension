import React from 'react';
import configureStore from 'redux-mock-store';

import ConfirmPageContainerHeader from '.';
import { getEnvironmentType } from '../../../../../app/scripts/lib/util';
import { renderWithProvider } from '../../../../../test/lib/render-helpers';

jest.mock('../../../../../app/scripts/lib/util', () => ({
  ...jest.requireActual('../../../../../app/scripts/lib/util'),
  getEnvironmentType: jest.fn(),
}));

describe('Confirm Detail Row Component', () => {
  const mockState = {
    metamask: {
      networkStatus: 'available',
      providerConfig: {
        type: 'rpc',
        chainId: '0x5',
      },
    },
  };

  const store = configureStore()(mockState);

  it('should match snapshot', () => {
    getEnvironmentType.mockReturnValue('popup');

    const props = {
      showEdit: false,
      onEdit: jest.fn(),
      showAccountInHeader: false,
      accountAddress: '0xmockAccountAddress',
    };

    const { container } = renderWithProvider(
      <ConfirmPageContainerHeader {...props} />,
      store,
    );

    expect(container).toMatchSnapshot();
  });

  it('should only render children when fullscreen and showEdit is false & snapshot match', () => {
    getEnvironmentType.mockReturnValue('fullscreen');

    const props = {
      showEdit: false,
      onEdit: jest.fn(),
      showAccountInHeader: false,
      accountAddress: '0xmockAccountAddress',
    };

    const { container } = renderWithProvider(
      <ConfirmPageContainerHeader {...props}>
        <div className="nested-test-class" />
      </ConfirmPageContainerHeader>,
      store,
    );

    expect(container).toMatchSnapshot();
  });
});
