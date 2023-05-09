import React from 'react';
import configureMockStore from 'redux-mock-store';

import SendGasRow from '.';
import mockSendState from '../../../../../test/data/mock-send-state.json';
import { renderWithProvider } from '../../../../../test/lib/render-helpers';

jest.mock('../../../../ducks/send', () => ({
  ...jest.requireActual('../../../../ducks/send'),
  getGasInputMode: jest.fn().mockReturnValue('INLINE'),
}));

describe('SendGasRow Component', () => {
  describe('render', () => {
    const mockStore = configureMockStore()(mockSendState);

    it('should match snapshot', () => {
      const { container } = renderWithProvider(<SendGasRow />, mockStore);

      expect(container).toMatchSnapshot();
    });
  });
});
