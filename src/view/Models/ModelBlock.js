import React from 'react';
import { Button, Card, message, Typography } from 'antd';
// import modelImage from '../../assets/images/modelImage.svg';
import modelImages from './modelImages';
import styles from './Models.module.scss';
import { serviceUpdateModel } from './actions';
import { useHistory } from 'react-router';
import { MODEL_STATUS, SLUG_TO_MODEL } from '../../utils/constants/config';

const { Text } = Typography;
const { Meta } = Card;

function ModelBlock({ data, projectId, onUpdate }) {
  const { name, description, vendor, status, id, slug } = data;
  const history = useHistory();

  const handleChangeStatus = (status) => {
    serviceUpdateModel(projectId, id, status)
      .then((res) => {
        message.success('Status has been updated');
        onUpdate();
      })
      .catch((err) => {
        message.error('Update failed');
      });
  };

  const handleActiveModel = () => {
    history.push(`/projects/${projectId}/models/${slug}`);
    // console.log(`Go to model ${slug}`);
  };

  return (
    <Card
      hoverable
      style={{ width: '100%', minWidth: 150, minHeight: 224 }}
      cover={
        <img
          alt="model-cover"
          style={{ height: 150, objectFit: 'cover' }}
          src={modelImages[SLUG_TO_MODEL[slug]]}
        />
      }
      onClick={handleActiveModel}
    >
      <div className={styles.content}>
        <Meta
          title={name}
          description={description}
          style={{ marginBottom: 10 }}
        />
        <Text type="secondary">{vendor}</Text>
      </div>
      <div className={styles.buttonContainer}>
        <Button type="primary" onClick={handleActiveModel}>
          Learn more
        </Button>
        {status === 'off' ? (
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              handleChangeStatus(MODEL_STATUS.ON);
            }}
          >
            Enable
          </Button>
        ) : (
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            ghost
            danger
            onClick={(e) => {
              e.stopPropagation();
              handleChangeStatus(MODEL_STATUS.OFF);
            }}
          >
            Disable
          </Button>
        )}
      </div>
    </Card>
  );
}

export default ModelBlock;
