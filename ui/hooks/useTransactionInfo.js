import { useSelector } from 'react-redux';

import { hexToDecimal } from '../../shared/modules/conversion.utils';
import { isEqualCaseInsensitive } from '../../shared/modules/string-utils';
import { getProviderConfig } from '../ducks/metamask/metamask';

export const useTransactionInfo = (txData = {}) => {
  const { allNftContracts, selectedAddress } = useSelector(
    (state) => state.metamask,
  );
  const { chainId } = useSelector(getProviderConfig);

  const isNftTransfer = Boolean(
    allNftContracts?.[selectedAddress]?.[hexToDecimal(chainId)]?.find(
      (contract) => {
        return isEqualCaseInsensitive(contract.address, txData.txParams.to);
      },
    ),
  );

  return { isNftTransfer };
};
