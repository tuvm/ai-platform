import React from 'react';
import ProjectBlock from './ProjectBlock';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

export default function ProjectList({ data }) {
  return (
    <div>
      <Title level={4}>All Projects</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
        {data &&
          data.data &&
          data.data.map((pro) => (
            <Col className="gutter-row" xs={12} sm={24} md={8} key={pro.id}>
              <ProjectBlock data={pro} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
