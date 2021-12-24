import React from 'react';
import { Button, Card, Typography } from 'antd';
import modelImage from '../../assets/images/modelImage.svg';
import styles from './Models.module.scss';

const { Text } = Typography;
const { Meta } = Card;

function ModelBlock({ data }) {
  const handleActiveProject = () => {};

  const { title, description, vendor, status } = data;

  return (
    <Card
      hoverable
      style={{ width: '100%', minWidth: 150, minHeight: 224 }}
      cover={<img alt="model-cover" src={modelImage} />}
      onClick={handleActiveProject}
    >
      <div className={styles.content}>
        <Meta
          title={title}
          description={description}
          style={{ marginBottom: 10 }}
        />
        <Text type="secondary">{vendor}</Text>
      </div>
      {status === 'enabled' ? (
        <Button type="primary">Enable</Button>
      ) : (
        <Button type="primary" danger>
          Disable
        </Button>
      )}
    </Card>
  );
}

export default ModelBlock;
