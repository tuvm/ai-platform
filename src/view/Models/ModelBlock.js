import React from 'react';
import { Button, Card, message, Typography } from 'antd';
import modelImage from '../../assets/images/modelImage.svg';
import styles from './Models.module.scss';
import { serviceUpdateModel } from './actions';
import { useHistory } from 'react-router';

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
  };

  return (
    <Card
      hoverable
      style={{ width: '100%', minWidth: 150, minHeight: 224 }}
      cover={<img alt="model-cover" src={modelImage} />}
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
        <Button type="text" onClick={() => {}}>
          Learn more
        </Button>
        {status === 'off' ? (
          <Button type="primary" onClick={() => handleChangeStatus('on')}>
            Enable
          </Button>
        ) : (
          <Button
            type="primary"
            danger
            onClick={() => handleChangeStatus('off')}
          >
            Disable
          </Button>
        )}
      </div>
    </Card>
  );
}

export default ModelBlock;
