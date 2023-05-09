import { screen } from '@testing-library/react';
import React from 'react';

import { GasEstimateTypes } from '../../../../shared/constants/gas';
import { TransactionEnvelopeType } from '../../../../shared/constants/transaction';
import mockEstimates from '../../../../test/data/mock-estimates.json';
import mockState from '../../../../test/data/mock-state.json';
import { renderWithProvider } from '../../../../test/jest';
import { GasFeeContextProvider } from '../../../contexts/gasFee';
import configureStore from '../../../store/store';
import TransactionDetail from './transaction-detail.component';

jest.mock('../../../store/actions', () => ({
  disconnectGasFeeEstimatePoller: jest.fn(),
  getGasFeeEstimatesAndStartPolling: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
  addPollingTokenToAppState: jest.fn(),
  createTransactionEventFragment: jest.fn(),
}));

const render = ({ componentProps, contextProps } = {}) => {
  const store = configureStore({
    metamask: {
      ...mockState.metamask,
      accounts: {
        [mockState.metamask.selectedAddress]: {
          address: mockState.metamask.selectedAddress,
          balance: '0x1F4',
        },
      },
      gasFeeEstimates: mockEstimates[GasEstimateTypes.feeMarket],
    },
  });

  return renderWithProvider(
    <GasFeeContextProvider {...contextProps}>
      <TransactionDetail
        onEdit={() => {
          console.log('on edit');
        }}
        rows={[]}
        userAcknowledgedGasMissing
        {...componentProps}
      />
    </GasFeeContextProvider>,
    store,
  );
};

describe('TransactionDetail', () => {
  it('should render edit link with text low if low gas estimates are selected', () => {
    render({ contextProps: { transaction: { userFeeLevel: 'low' } } });
    expect(screen.queryByText('🐢')).toBeInTheDocument();
    expect(screen.queryByText('Low')).toBeInTheDocument();
  });

  it('should render edit link with text edit for legacy transactions', () => {
    render({
      contextProps: {
        transaction: {
          userFeeLevel: 'low',
          txParams: { type: TransactionEnvelopeType.legacy },
        },
      },
    });
    expect(screen.queryByText('🐢')).not.toBeInTheDocument();
    expect(screen.queryByText('Edit')).toBeInTheDocument();
  });
});
