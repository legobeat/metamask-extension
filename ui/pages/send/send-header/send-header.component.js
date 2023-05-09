import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AssetType } from '../../../../shared/constants/transaction';
import PageContainerHeader from '../../../components/ui/page-container/page-container-header';
import { getMostRecentOverviewPage } from '../../../ducks/history/history';
import {
  getDraftTransactionExists,
  getSendAsset,
  getSendStage,
  resetSendState,
  SEND_STAGES,
} from '../../../ducks/send';
import { useI18nContext } from '../../../hooks/useI18nContext';

export default function SendHeader() {
  const history = useHistory();
  const mostRecentOverviewPage = useSelector(getMostRecentOverviewPage);
  const dispatch = useDispatch();
  const stage = useSelector(getSendStage);
  const asset = useSelector(getSendAsset);
  const t = useI18nContext();
  const draftTransactionExists = useSelector(getDraftTransactionExists);
  const onClose = () => {
    dispatch(resetSendState());
    history.push(mostRecentOverviewPage);
  };

  let title = asset?.type === AssetType.native ? t('send') : t('sendTokens');

  if (
    draftTransactionExists === false ||
    [SEND_STAGES.ADD_RECIPIENT, SEND_STAGES.INACTIVE].includes(stage)
  ) {
    title = t('sendTo');
  } else if (stage === SEND_STAGES.EDIT) {
    title = t('edit');
  }

  return (
    <PageContainerHeader
      className="send__header"
      onClose={onClose}
      title={title}
      headerCloseText={
        stage === SEND_STAGES.EDIT ? t('cancelEdit') : t('cancel')
      }
      hideClose={stage === SEND_STAGES.DRAFT}
    />
  );
}
