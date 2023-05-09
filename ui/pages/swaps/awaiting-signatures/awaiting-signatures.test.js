import React from 'react';
import configureMockStore from 'redux-mock-store';

import AwaitingSignatures from '.';
import {
  renderWithProvider,
  createSwapsMockStore,
} from '../../../../test/jest';

describe('AwaitingSignatures', () => {
  it('renders the component with initial props for 1 confirmation', () => {
    const store = configureMockStore()(createSwapsMockStore());
    const { getByText } = renderWithProvider(<AwaitingSignatures />, store);
    expect(getByText('Confirm with your hardware wallet')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
  });
});
