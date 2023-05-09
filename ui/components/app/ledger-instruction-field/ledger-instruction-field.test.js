import React from 'react';
import configureMockStore from 'redux-mock-store';

import LedgerInstructionField from '.';
import { renderWithProvider } from '../../../../test/lib/render-helpers';

describe('LedgerInstructionField Component', () => {
  const mockStore = {
    appState: {
      ledgerWebHidConnectedStatus: 'notConnected',
    },
    metamask: {
      ledgerTransportType: 'webhid',
    },
  };

  describe('rendering', () => {
    it('should render properly with data instruction', () => {
      const store = configureMockStore()(mockStore);

      const { container } = renderWithProvider(
        <LedgerInstructionField showDataInstruction />,
        store,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
