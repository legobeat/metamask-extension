import React from 'react';
import configureMockStore from 'redux-mock-store';

import UserPreferencedCurrencyDisplay from '.';
import { renderWithProvider } from '../../../../test/lib/render-helpers';

describe('UserPreferencedCurrencyDisplay Component', () => {
  describe('rendering', () => {
    const mockState = {
      metamask: {
        providerConfig: {
          chainId: '0x99',
        },
        preferences: {
          useNativeCurrencyAsPrimaryCurrency: true,
        },
      },
    };
    const mockStore = configureMockStore()(mockState);

    it('should match snapshot', () => {
      const { container } = renderWithProvider(
        <UserPreferencedCurrencyDisplay />,
        mockStore,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
