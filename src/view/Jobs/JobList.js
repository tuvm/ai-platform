import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import moment from 'moment';
import styles from './Jobs.module.scss';
import JsonView from './JsonView';

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

const INITIAL_FILTERS = {
  startDate: moment().subtract(30, 'days').format('YYYYMMDD'),
  endDate: moment().format('YYYYMMDD'),
};

let params = {
  offset: 0,
  limit: 25,
  sort: '-StudyDate',
  query_string: `StudyDate:[${INITIAL_FILTERS.startDate} TO ${INITIAL_FILTERS.endDate}]`,
};

const JobList = () => {
  const data = useSelector((state) => state.system.jobList);
  console.log(data);
  const loading = useSelector((state) => state.system.jobListLoading);
  // const [isViewResult, setIsViewResult] = useState(false);

  const columns = [
    // {
    //   title: '#',
    //   width: 40,
    //   fixed: 'left',
    //   align: 'center',
    //   dataIndex: 'PatientID',
    //   key: 'PatientID',
    //   render: (text, record, index) => index + 1,
    // },
    {
      title: 'StudyUID',
      width: 100,
      dataIndex: 'StudyInstanceUID',
      key: 'StudyInstanceUID',
      ellipsis: true,
    },
    {
      title: 'JobID',
      width: 100,
      dataIndex: ['_source', 'job_id'],
      key: 'JobID',
      ellipsis: true,
    },
    {
      title: 'Priority',
      width: 50,
      dataIndex: 'Priority',
      key: 'Priority',
      sorter: true,
    },
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
      sorter: true,
    },
    {
      title: 'Metadata',
      dataIndex: 'Metadata',
      key: 'Metadata',
      width: 30,
      render: () => (
        <Button
          type="link"
          onClick={() => JsonView.open('Metadata', data.data)}
        >
          View
        </Button>
      ),
    },
    {
      title: 'Result',
      dataIndex: ['_source', 'ai_result'],
      key: 'Result',
      width: 30,
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
      width: 80,
      render: (text) => moment(text).format('MMM DD, YYYY, HH:mm.ss.SSS'),
    },
    {
      title: 'Updated time',
      dataIndex: ['_source', 'finish_time'],
      key: 'UpdatedTime',
      width: 80,
      render: (text) => moment(text).format('MMM DD, YYYY, HH:mm.ss.SSS'),
    },
  ];

  const handleOnChangeTable = useCallback((_, __, sorter) => {
    let sort;
    if (sorter?.order === 'ascend') {
      sort = `${sorter.field}`;
    } else if (sorter?.order === 'descend') {
      sort = `-${sorter.field}`;
    }
    params = { ...params, sort };
  }, []);

  return (
    <div className={styles.jobList} fa="dsfaf">
      <Table
        size="small"
        columns={columns}
        dataSource={data?.records || []}
        rowKey={(record) => record.JobID}
        pagination={true}
        loading={loading}
        onChange={handleOnChangeTable}
      />
    </div>
  );
};

export default JobList;
