import { screen } from '@testing-library/react';
import React from 'react';

import mockState from '../../../../test/data/mock-state.json';
import { renderWithProvider } from '../../../../test/jest';
import configureStore from '../../../store/store';
import AssetList from './asset-list';

const render = () => {
  const store = configureStore({
    metamask: {
      ...mockState.metamask,
    },
  });
  return renderWithProvider(<AssetList />, store);
};

describe('AssetList', () => {
  it('renders AssetList component and shows Refresh List text', () => {
    render();
    expect(screen.getByText('Refresh list')).toBeInTheDocument();
  });
});
