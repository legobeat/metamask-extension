import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import configureMockStore from 'redux-mock-store';

import ConfirmDeleteNetwork from '.';
import mockState from '../../../../../test/data/mock-state.json';
import { renderWithProvider } from '../../../../../test/lib/render-helpers';

describe('Confirm Delete Network', () => {
  const props = {
    hideModal: jest.fn(),
    onConfirm: jest.fn(),
    removeNetworkConfiguration: jest.fn().mockResolvedValue(),
    target: 'target',
  };

  it('should match snapshot', () => {
    const mockStore = configureMockStore()(mockState);
    const { container } = renderWithProvider(
      <ConfirmDeleteNetwork {...props} />,
      mockStore,
    );

    expect(container).toMatchSnapshot();
  });

  it('clicks cancel to hide modal', async () => {
    const { queryByText } = renderWithProvider(
      <ConfirmDeleteNetwork.WrappedComponent {...props} />,
    );

    fireEvent.click(queryByText('[cancel]'));

    expect(props.removeNetworkConfiguration).not.toHaveBeenCalled();
    expect(props.onConfirm).not.toHaveBeenCalled();

    expect(props.hideModal).toHaveBeenCalled();
  });

  it('clicks delete to delete the target and hides modal', async () => {
    const { queryByText } = renderWithProvider(
      <ConfirmDeleteNetwork.WrappedComponent {...props} />,
    );

    fireEvent.click(queryByText('[delete]'));

    await waitFor(() => {
      expect(props.removeNetworkConfiguration).toHaveBeenCalled();
      expect(props.onConfirm).toHaveBeenCalled();
      expect(props.hideModal).toHaveBeenCalled();
    });
  });
});
