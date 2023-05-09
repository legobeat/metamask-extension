import { screen } from '@testing-library/react';
import React from 'react';

import mockState from '../../../../test/data/mock-state.json';
import { renderWithProvider } from '../../../../test/jest';
import configureStore from '../../../store/store';
import TransactionList from './transaction-list.component';

const render = () => {
  const store = configureStore({
    metamask: {
      ...mockState.metamask,
    },
  });
  return renderWithProvider(<TransactionList />, store);
};

describe('TransactionList', () => {
  it('renders TransactionList component and shows You have no transactions text', () => {
    render();
    expect(screen.getByText('You have no transactions')).toBeInTheDocument();
  });
});
