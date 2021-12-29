import React from 'react';
import ProjectBlock from './ProjectBlock';
import { Row, Col, Typography } from 'antd';
import AddNewProject from './AddNewProject';
import { useSelector, useDispatch } from 'react-redux';
import { PERM_PROJECT_ORG_CREATE } from '../../utils/permission/perms';
import UserService from '../system/userService';

const { Title } = Typography;

export default function RecentProjects({ data }) {
  const ticket = useSelector((state) => state.system.ticket);

  const canCreate = () => {
    return UserService.hasPerm(ticket, [PERM_PROJECT_ORG_CREATE]);
  };

  return (
    <>
      <Title level={4}>Recent Projects</Title>
      <Row gutter={[16, 16]}>
        {canCreate() && (
          <Col className="gutter-row" xs={12} sm={24} md={8}>
            <AddNewProject />
          </Col>
        )}

        {data &&
          data.data &&
          data.data.map((pro) => (
            <Col className="gutter-row" xs={12} sm={24} md={8} key={pro.id}>
              <ProjectBlock data={pro} />
            </Col>
          ))}
      </Row>
    </>
  );
}
