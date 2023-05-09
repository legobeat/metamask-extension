import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { I18nContext } from '../../../contexts/i18n';
import { hideModal } from '../../../store/actions';
import Modal from '../../app/modal';
import ComplianceDetails from '../compliance-details';

export default function ComplianceDetailsModal({
  onGenerateComplianceReport,
  reportAddress,
}) {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(hideModal);
  const t = useContext(I18nContext);

  return (
    <Modal
      headerText={t('amlCompliance')}
      hideFooter="true"
      onClose={handleClose}
      contentClass="compliance-details-modal-content"
    >
      <ComplianceDetails
        address={reportAddress}
        onClose={handleClose}
        onGenerate={onGenerateComplianceReport}
      />
    </Modal>
  );
}

ComplianceDetailsModal.propTypes = {
  reportAddress: PropTypes.func.isRequired,
  onGenerateComplianceReport: PropTypes.func.isRequired,
};
