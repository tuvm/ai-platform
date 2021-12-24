import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import moment from 'moment';
import styles from './Jobs.module.scss';
import JsonView from './JsonView';

const STATUS_COLOR = {
  Initial: '#000',
  Validating: '#000',
  Diagnosing: '#F59A23',
  Done: '#95F204',
  Fail: '#D9001B',
};

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
    },
    {
      title: 'JobID',
      width: 50,
      dataIndex: 'JobID',
      key: 'JobID',
    },
    {
      title: 'Priority',
      width: 50,
      dataIndex: 'Priority',
      key: 'Priority',
    },
    {
      title: 'Status',
      width: 50,
      dataIndex: 'Status',
      key: 'Status',
      ellipsis: true,
      sorter: true,
      render: (text) => <div style={{ color: STATUS_COLOR[text] }}>{text}</div>,
    },
    {
      title: 'Model',
      width: 50,
      dataIndex: 'Model',
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
      dataIndex: 'Result',
      key: 'Result',
      width: 30,
      render: () => (
        <Button type="link" onClick={() => JsonView.open('Result', data.data)}>
          View
        </Button>
      ),
    },
    {
      title: 'Created time',
      dataIndex: 'CreatedTime',
      key: 'CreatedTime',
      width: 80,
      render: (text) => moment(text * 1000).toLocaleString(),
    },
    {
      title: 'Updated time',
      dataIndex: 'UpdatedTime',
      key: 'UpdatedTime',
      width: 80,
      render: (text) => moment(text * 1000).toLocaleString(),
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
        dataSource={data.data || []}
        rowKey={(record) => record.JobID}
        pagination={true}
        loading={loading}
        onChange={handleOnChangeTable}
      />
    </div>
  );
};

export default JobList;
