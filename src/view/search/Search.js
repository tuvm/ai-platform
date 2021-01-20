import React from 'react';
import { Table, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './Search.scss';

const { Option } = Select;

const Search = (props) => {
  const columns = [
    {
      title: 'Study code',
      dataIndex: 'code',
      key: 'code',
      ellipsis: true,
    },
    {
      title: 'Study UID',
      dataIndex: 'dicom_tags.StudyInstanceUID',
      key: 'dicom_tags.StudyInstanceUID',
      ellipsis: true,
    },
    {
      title: 'Last open',
      dataIndex: 'modified',
      key: 'modified',
      ellipsis: true,
      width: 220,
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 160,
      align: 'center',
    },
  ];
  return (
    <div className="common-style-page search-page">
      <div className="top-content">
        <div className="page-header">
          <div className="title">Search</div>
        </div>
        <div className="search-box">
          <Input.Group compact>
            <Select defaultValue="All">
              <Option value="All">All projects</Option>
              <Option value="Study">Study</Option>
            </Select>
            <Input prefix={<SearchOutlined />} />
          </Input.Group>
        </div>
      </div>
      <div className="page-content">
        <div className="table-content">
          <Table
            className="dark-table"
            size="small"
            loading={false}
            rowKey={(record) => record.id}
            dataSource={[]}
            columns={columns}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
