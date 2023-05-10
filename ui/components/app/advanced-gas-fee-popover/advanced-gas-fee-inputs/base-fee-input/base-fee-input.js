import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  EditGasModes,
  PriorityLevels,
} from '../../../../../../shared/constants/gas';
import { decGWEIToHexWEI } from '../../../../../../shared/modules/conversion.utils';
import { useGasFeeContext } from '../../../../../contexts/gasFee';
import { PRIMARY } from '../../../../../helpers/constants/common';
import { bnGreaterThan, bnLessThan } from '../../../../../helpers/utils/util';
import { useCurrencyDisplay } from '../../../../../hooks/useCurrencyDisplay';
import { useI18nContext } from '../../../../../hooks/useI18nContext';
import { useUserPreferencedCurrency } from '../../../../../hooks/useUserPreferencedCurrency';
import { HIGH_FEE_WARNING_MULTIPLIER } from '../../../../../pages/send/send.constants';
import { getAdvancedGasFeeValues } from '../../../../../selectors';
import Box from '../../../../ui/box';
import FormField from '../../../../ui/form-field';
import AdvancedGasFeeInputSubtext from '../../advanced-gas-fee-input-subtext';
import { useAdvancedGasFeePopoverContext } from '../../context';

const validateBaseFee = (value, gasFeeEstimates, maxPriorityFeePerGas) => {
  if (bnGreaterThan(maxPriorityFeePerGas, value)) {
    return 'editGasMaxBaseFeeGWEIImbalance';
  }
  if (
    gasFeeEstimates?.low &&
    bnLessThan(value, gasFeeEstimates.low.suggestedMaxFeePerGas)
  ) {
    return 'editGasMaxBaseFeeLow';
  }
  if (
    gasFeeEstimates?.high &&
    bnGreaterThan(
      value,
      gasFeeEstimates.high.suggestedMaxFeePerGas * HIGH_FEE_WARNING_MULTIPLIER,
    )
  ) {
    return 'editGasMaxBaseFeeHigh';
  }
  return null;
};

const BaseFeeInput = () => {
  const t = useI18nContext();

  const { gasFeeEstimates, estimateUsed, maxFeePerGas, editGasMode } =
    useGasFeeContext();
  const {
    gasLimit,
    maxPriorityFeePerGas,
    setErrorValue,
    setMaxFeePerGas,
    setMaxBaseFee,
  } = useAdvancedGasFeePopoverContext();

  const { estimatedBaseFee, historicalBaseFeeRange, baseFeeTrend } =
    gasFeeEstimates;
  const [baseFeeError, setBaseFeeError] = useState();
  const { currency, numberOfDecimals } = useUserPreferencedCurrency(PRIMARY);

  const advancedGasFeeValues = useSelector(getAdvancedGasFeeValues);

  const [baseFee, setBaseFee] = useState(() => {
    if (
      estimateUsed !== PriorityLevels.custom &&
      advancedGasFeeValues?.maxBaseFee &&
      editGasMode !== EditGasModes.swaps
    ) {
      return advancedGasFeeValues.maxBaseFee;
    }

    return maxFeePerGas;
  });

  const [baseFeeInPrimaryCurrency] = useCurrencyDisplay(
    decGWEIToHexWEI(baseFee * gasLimit),
    { currency, numberOfDecimals },
  );

  const updateBaseFee = useCallback(
    (value) => {
      setBaseFee(value);
    },
    [setBaseFee],
  );

  useEffect(() => {
    setMaxFeePerGas(baseFee);
    const error = validateBaseFee(
      baseFee,
      gasFeeEstimates,
      maxPriorityFeePerGas,
    );

    setBaseFeeError(error);
    setErrorValue('maxFeePerGas', error === 'editGasMaxBaseFeeGWEIImbalance');
    setMaxBaseFee(baseFee);
  }, [
    baseFee,
    gasFeeEstimates,
    maxPriorityFeePerGas,
    setBaseFeeError,
    setErrorValue,
    setMaxFeePerGas,
    setMaxBaseFee,
  ]);

  return (
    <Box className="base-fee-input" marginLeft={2} marginRight={2}>
      <FormField
        dataTestId="base-fee-input"
        error={baseFeeError ? t(baseFeeError) : ''}
        onChange={updateBaseFee}
        titleText={t('maxBaseFee')}
        titleUnit={`(${t('gwei')})`}
        tooltipText={t('advancedBaseGasFeeToolTip')}
        value={baseFee}
        detailText={`≈ ${baseFeeInPrimaryCurrency}`}
        allowDecimals
        numeric
      />
      <AdvancedGasFeeInputSubtext
        latest={estimatedBaseFee}
        historical={historicalBaseFeeRange}
        trend={baseFeeTrend}
      />
    </Box>
  );
};

export default BaseFeeInput;
