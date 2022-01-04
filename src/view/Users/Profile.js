import React, { useEffect, useState } from 'react';
import { Button, Descriptions, message, Space, Upload, Typography } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import moment from 'moment';
import './Profile.scss';
import NameModal from './NameModal';
import PasswordModal from './PasswordModal';
import { getAccountInfo } from '../system/systemAction';
import { actionUpdateUser } from './actions';
// import avatar from '../../assets/images/avatar.svg';
const { Title } = Typography;

const Profile = () => {
  const profile = useSelector((state) => state.system.profile);
  const [imageUrl, setImageUrl] = useState(profile.avatar);
  const [nameModal, setNameModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  console.log(profile);

  useEffect(() => {
    setImageUrl(profile.avatar);
  }, [profile.avatar]);

  const uploadAvatar = (src) => {
    actionUpdateUser(profile.id_, { avatar: src, full_name: profile.full_name })
      .then((res) => {
        message.success('Updated Profile');
        setImageUrl(src);
      })
      .catch((err) => {
        message.error('Updated failed');
      });
  };

  return (
    <div className="profile content-inner-center">
      <Descriptions
        title={<Title level={4}>Your Profile</Title>}
        column={1}
        style={{ maxWidth: 350 }}
      >
        <Descriptions.Item label="Full Name" style={{ alignItems: 'center' }}>
          {profile.full_name}
          <Button type="link" onClick={() => setNameModal(true)}>
            <EditOutlined />
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="Email Address">
          {profile.email}
        </Descriptions.Item>
        <Descriptions.Item label="Created Time">
          {moment(profile.created_time).format('MMM DD, YYYY, hh:mm:ss A')}
        </Descriptions.Item>
        <Descriptions.Item label="Password">
          <Button type="default" onClick={() => setPasswordModal(true)}>
            Change Password
          </Button>
        </Descriptions.Item>
      </Descriptions>
      <div className="avatar">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          style={{ marginRight: 30 }}
          showUploadList={false}
          action={null}
          beforeUpload={(file) => {
            let reader = new FileReader();
            reader.onload = (e) => {
              uploadAvatar(e.target.result);
            };
            reader.readAsDataURL(file);
          }}
          onChange={(data) => console.log(data)}
        >
          {imageUrl ? (
            <>
              <img
                className="image"
                src={imageUrl}
                alt="avatar"
                style={{ width: '100%' }}
              />
              <div
                className="overlay"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  display: 'none',
                  background: 'rgba(0,0,0,0.5)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 16,
                  transition: 'all 0.3s',
                }}
              >
                <Space size="middle">
                  <EditOutlined className="image-action" />
                  <DeleteOutlined
                    className="image-action"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      uploadAvatar('');
                    }}
                  />
                </Space>
              </div>
            </>
          ) : (
            <div
              className="avatar-text"
              style={{ color: '#000', opacity: 0.4 }}
            >
              <div style={{ marginTop: 8 }}>Upload Avatar</div>
              <CameraOutlined style={{ fontSize: 20 }} />
            </div>
          )}
        </Upload>
        {nameModal && (
          <NameModal
            profile={profile}
            open={nameModal}
            onSave={() => {
              setNameModal(false);
              getAccountInfo();
            }}
            onCancel={() => setNameModal(false)}
          />
        )}
        {passwordModal && (
          <PasswordModal
            userId={profile.id_}
            open={passwordModal}
            onSave={() => {
              setPasswordModal(false);
              // getAccountInfo();
            }}
            onCancel={() => setPasswordModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
