import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { ROLES } from '../../utils/constants/config';
import { checkRole } from '../system/systemAction';
import LabelGroups from '../../components/labels/LabelGroups';
import Labels from '../../components/labels/Labels';
import './LabelManagement.scss';

const LabelManagement = (props) => {
  const { userInfo } = props;
  const intl = useIntl();
  const { formatMessage: t } = intl;

  if (!checkRole(userInfo, ROLES.PO)) return null;

  return (
    <div className="common-style-page label-management-page">
      <div className="top-content">
        <div className="page-header">
          <div className="title">{t({ id: 'IDS_LABEL_MANAGEMENT' })}</div>
        </div>
      </div>
      <Row className="page-content">
        <Col className="col-label-groups">
          <LabelGroups />
        </Col>
        <Col className="col-labels">
          <Labels />
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  (state) => ({
    userInfo: state.system.profile,
    selectedLabelGroup: state.label.selectedLabelGroup,
  }),
  null
)(LabelManagement);
