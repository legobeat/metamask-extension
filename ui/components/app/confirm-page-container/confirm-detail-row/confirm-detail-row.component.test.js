import React from 'react';
import configureMockStore from 'redux-mock-store';

import ConfirmDetailRow from '.';
import { renderWithProvider } from '../../../../../test/lib/render-helpers';

describe('Confirm Detail Row Component', () => {
  const mockState = {
    metamask: {
      providerConfig: {
        type: 'rpc',
        chainId: '0x5',
      },
      preferences: {
        useNativeCurrencyAsPrimaryCurrency: true,
      },
    },
  };

  const store = configureMockStore()(mockState);

  it('should match snapshot', () => {
    const { container } = renderWithProvider(<ConfirmDetailRow />, store);

    expect(container).toMatchSnapshot();
  });
});
