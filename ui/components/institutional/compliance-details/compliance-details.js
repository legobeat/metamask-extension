import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { I18nContext } from '../../../contexts/i18n';
import {
  fetchHistoricalReports,
  getComplianceHistoricalReportsByAddress,
  getComplianceTenantSubdomain,
} from '../../../ducks/institutional/institutional';
import {
  TextColor,
  TextVariant,
  JustifyContent,
  AlignItems,
  BLOCK_SIZES,
  DISPLAY,
  FLEX_DIRECTION,
} from '../../../helpers/constants/design-system';
import { formatDate } from '../../../helpers/utils/util';
import SwapsFooter from '../../../pages/swaps/swaps-footer';
import { Text } from '../../component-library';
import Box from '../../ui/box';
import InfoTooltip from '../../ui/info-tooltip';

const ComplianceDetails = ({ address, onClose, onGenerate }) => {
  const t = useContext(I18nContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistoricalReports(address));
  }, [address, dispatch]);

  const [lastReport, setLastReport] = useState(null);
  const historicalReports = useSelector(
    getComplianceHistoricalReportsByAddress(address),
  );

  useEffect(() => {
    if (historicalReports && historicalReports.length) {
      setLastReport(
        historicalReports.reduce((prev, cur) =>
          prev.createTime > cur.createTime ? prev : cur,
        ),
      );
    }
  }, [historicalReports]);

  const complianceTenantSubdomain = useSelector(getComplianceTenantSubdomain);

  return (
    <Box
      display={DISPLAY.FLEX}
      flexDirection={FLEX_DIRECTION.COLUMN}
      paddingLeft={4}
      paddingRight={4}
      className="compliance-details"
    >
      <Box
        display={DISPLAY.FLEX}
        flexDirection={FLEX_DIRECTION.COLUMN}
        justifyContent={JustifyContent.center}
        height={BLOCK_SIZES.TWO_THIRDS}
        paddingTop={4}
        paddingBottom={4}
        className="compliance-details__row"
      >
        <Text>{t('address')}</Text>
        <Text variant={TextVariant.bodyXs}>{address}</Text>
      </Box>
      <Box
        display={DISPLAY.FLEX}
        flexDirection={FLEX_DIRECTION.COLUMN}
        justifyContent={JustifyContent.center}
        height={BLOCK_SIZES.TWO_THIRDS}
        paddingTop={4}
        paddingBottom={4}
        className="compliance-details__row"
      >
        <Box
          display={DISPLAY.FLEX}
          alignItems={AlignItems.center}
          marginBottom={1}
          color={TextColor.textAlternative}
        >
          <Text marginRight={2}>{t('riskRating')}</Text>
          <InfoTooltip
            position="bottom"
            contentText={<span>{t('riskRatingTooltip')}</span>}
          />
        </Box>
        <Box
          className={classnames('compliance-row__column-risk', {
            'compliance-row__column-risk--green': lastReport?.risk === 'low',
            'compliance-row__column-risk--yellow':
              lastReport?.risk === 'medium',
            'compliance-row__column-risk--orange': lastReport?.risk === 'high',
            'compliance-row__column-risk--red':
              lastReport?.risk === 'unacceptable',
          })}
        >
          <Text>{lastReport ? lastReport.risk : t('noReport')}</Text>
        </Box>
      </Box>
      <Box
        display={DISPLAY.FLEX}
        flexDirection={FLEX_DIRECTION.COLUMN}
        justifyContent={JustifyContent.center}
        height={BLOCK_SIZES.TWO_THIRDS}
        paddingTop={4}
        paddingBottom={4}
        className="compliance-details__row"
      >
        <Box
          display={DISPLAY.FLEX}
          alignItems={AlignItems.center}
          color={TextColor.textAlternative}
        >
          <Text marginRight={2}>{t('reportLastRun')}</Text>
          <InfoTooltip
            position="bottom"
            contentText={<span>{t('reportLastRunTooltip')}</span>}
          />
        </Box>
        <Text color={TextColor.textDefault}>
          {lastReport
            ? formatDate(new Date(lastReport.createTime).getTime())
            : 'N/A'}
        </Text>
      </Box>
      <Box>
        <SwapsFooter
          onSubmit={() => {
            onGenerate(address);
            onClose();
          }}
          submitText={t('runReport')}
          onCancel={() =>
            global.platform.openTab({
              url: `https://${complianceTenantSubdomain}.compliance.codefi.network/app/kyt/addresses/${lastReport.address}/${lastReport.reportId}`,
            })
          }
          cancelText={t('showReport')}
          hideCancel={!lastReport}
          approveActive={lastReport}
          showTopBorder
        />
      </Box>
    </Box>
  );
};

ComplianceDetails.propTypes = {
  address: PropTypes.string,
  onClose: PropTypes.func,
  onGenerate: PropTypes.func,
};

export default ComplianceDetails;
