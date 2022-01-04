import React from 'react';
import { Col, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ModelBlock from './ModelBlock';
import Loading from '../../components/loading/Loading';
import { useProjectsParams } from '../../utils/hooks';
import { getModellist } from './actions';
// import style from './Models.module.scss';
const { Title } = Typography;

export default function ModelList() {
  const data = useSelector((state) => state.system.modelList);
  const { params } = useProjectsParams();
  const loading = useSelector((state) => state.system.modelListLoading);
  const dispatch = useDispatch();

  const handleOnUpdate = () => {
    dispatch(getModellist(params.projectId));
  };
  if (loading) return <Loading isLoading={true} />;
  return (
    <div>
      <Title level={4}>All Models</Title>
      <Row gutter={[30, 30]} style={{ marginBottom: 8 }}>
        {data &&
          data.modules &&
          data.modules.map((model) => (
            <Col
              className="gutter-row"
              xs={24}
              sm={24}
              md={12}
              lg={8}
              xl={6}
              key={model.id}
            >
              <ModelBlock
                data={model}
                projectId={params.projectId}
                onUpdate={handleOnUpdate}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
}
