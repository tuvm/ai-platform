import React from 'react';
import { Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import ModelBlock from './ModelBlock';
import Loading from '../../components/loading/Loading';
// import style from './Models.module.scss';
const { Title } = Typography;

export default function ModelList() {
  const data = useSelector((state) => state.system.modelList);
  const loading = useSelector((state) => state.system.modelListLoading);
  if (loading) return <Loading isLoading={true} />;
  return (
    <div>
      <Title level={4}>All Models</Title>
      <Row gutter={[30, 30]} style={{ marginBottom: 8 }}>
        {data &&
          data.data &&
          data.data.map((model) => (
            <Col
              className="gutter-row"
              xs={12}
              sm={24}
              md={8}
              lg={6}
              key={model.id}
            >
              <ModelBlock data={model} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
