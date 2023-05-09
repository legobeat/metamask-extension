import { fireEvent } from '@testing-library/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import TokenCell from '.';
import { renderWithProvider } from '../../../../test/lib/render-helpers';

describe('Token Cell', () => {
  const mockState = {
    metamask: {
      currentCurrency: 'usd',
      selectedAddress: '0xAddress',
      contractExchangeRates: {
        '0xAnotherToken': 0.015,
      },
      conversionRate: 7.0,
      preferences: {},
      providerConfig: {
        chainId: '0x1',
        ticker: 'ETH',
        type: 'mainnet',
      },
    },
  };

  const mockStore = configureMockStore([thunk])(mockState);

  const props = {
    address: '0xAnotherToken',
    symbol: 'TEST',
    string: '5.000',
    currentCurrency: 'usd',
    onClick: jest.fn(),
  };

  it('should match snapshot', () => {
    const { container } = renderWithProvider(
      <TokenCell {...props} />,
      mockStore,
    );

    expect(container).toMatchSnapshot();
  });

  it('calls onClick when clicked', () => {
    const { queryByTestId } = renderWithProvider(
      <TokenCell {...props} />,
      mockStore,
    );

    fireEvent.click(queryByTestId('token-button'));

    expect(props.onClick).toHaveBeenCalled();
  });
});
