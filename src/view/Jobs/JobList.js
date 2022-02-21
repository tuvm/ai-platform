import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import moment from 'moment';
import styles from './Jobs.module.scss';
import JsonView from './JsonView';
import { ROWS_PER_PAGE } from '../../utils/constants/config';
import { get } from 'lodash';

const STATUS_COLOR = {
  INITIAL: '#000',
  VALIDATING: '#000',
  DIAGNOSING: '#F59A23',
  DONE: '#95F204',
  FAIL: '#D9001B',
};

// const STATUS_MAP = {
//   INITIAL: 'Initial',
//   VALIDATING: 'Validating',
//   DIAGNOSING: 'Diagnosing',
//   DONE: 'Done',
//   FAIL: 'Fail',
// };

// const INITIAL_FILTERS = {
//   startDate: moment().subtract(30, 'days').format('YYYYMMDD'),
//   endDate: moment().format('YYYYMMDD'),
// };

// let params = {
//   offset: 0,
//   limit: 25,
//   sort: '-StudyDate',
//   query_string: `StudyDate:[${INITIAL_FILTERS.startDate} TO ${INITIAL_FILTERS.endDate}]`,
// };

const JobList = ({ onChange }) => {
  const data = useSelector((state) => state.system.jobList);
  const loading = useSelector((state) => state.system.jobListLoading);
  // const [isViewResult, setIsViewResult] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    size: ROWS_PER_PAGE[0],
    total: data?.count || 0,
  });

  useEffect(() => {
    setPagination({ ...pagination, total: data?.count || 0 });
  }, [data]);

  const columns = [
    // {
    //   title: '#',
    //   width: 30,
    //   fixed: 'left',
    //   align: 'center',
    //   dataIndex: 'PatientID',
    //   key: 'PatientID',
    //   render: (text, record, index) =>
    //     (pagination.page - 1) * pagination.size + index + 1,
    // },
    {
      title: 'StudyUID',
      width: 300,
      dataIndex: ['_source', 'study_instance_uid'],
      key: 'StudyInstanceUID',
      ellipsis: true,
    },
    {
      title: 'JobID',
      width: 300,
      dataIndex: ['_source', 'job_id'],
      key: 'JobID',
      ellipsis: true,
      sorter: true,
    },
    // {
    //   title: 'Priority',
    //   width: 50,
    //   dataIndex: 'Priority',
    //   key: 'Priority',
    //   // sorter: true,
    // },
    {
      title: 'Status',
      width: 50,
      dataIndex: ['_source', 'status'],
      key: 'Status',
      ellipsis: true,
      sorter: true,
      render: (text) => <div style={{ color: STATUS_COLOR[text] }}>{text}</div>,
    },
    {
      title: 'Model',
      width: 50,
      dataIndex: ['_source', 'ai_model'],
      key: 'Model',
      ellipsis: true,
      // sorter: true,
    },
    {
      title: 'Metadata',
      dataIndex: ['_source', 'metadata'],
      key: 'Metadata',
      width: 50,
      render: (text, record) => (
        <Button
          type="link"
          onClick={() =>
            JsonView.open('Metadata', text || get(record, '_source.meta'))
          }
        >
          View
        </Button>
      ),
    },
    {
      title: 'Result',
      dataIndex: ['_source', 'ai_result'],
      key: 'Result',
      width: 50,
      render: (text) => (
        <Button type="link" onClick={() => JsonView.open('Result', text)}>
          View
        </Button>
      ),
    },
    {
      title: 'Created time',
      dataIndex: ['_source', 'start_time'],
      key: 'CreatedTime',
      width: 220,
      sorter: true,
      render: (text) => moment(text).format('MMM DD, YYYY, HH:mm.ss.SSS'),
    },
    {
      title: 'Updated time',
      dataIndex: ['_source', 'finish_time'],
      key: 'UpdatedTime',
      width: 220,
      sorter: true,
      render: (text) => moment(text).format('MMM DD, YYYY, HH:mm.ss.SSS'),
    },
  ];

  const handleOnChangeTable = useCallback((p, __, sorter) => {
    let sort;
    if (sorter?.order === 'ascend') {
      sort = `${sorter.field[1]}`;
    } else if (sorter?.order === 'descend') {
      sort = `-${sorter.field[1]}`;
    } else {
      sort = '-start_time';
    }
    const offset = (p.current - 1) * p.pageSize;
    const limit = p.pageSize;
    setPagination({ ...pagination, page: p.current, size: p.pageSize });
    onChange({ sort: sort, offset: offset, limit: limit });
  }, []);

  return (
    <div className={styles.jobList} fa="dsfaf">
      <Table
        size="small"
        columns={columns}
        dataSource={data?.records || []}
        rowKey={(record) => record._id}
        scroll={{ x: 'max-content' }}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          size: 'small',
          current: pagination.page,
          pageSize: pagination.size,
          total: pagination.total,
          showTotal: (total) => `Total ${total} item${total > 1 ? 's' : ''}`,
          pageSizeOptions: ROWS_PER_PAGE,
        }}
        loading={loading}
        onChange={handleOnChangeTable}
      />
    </div>
  );
};

export default React.memo(JobList);
