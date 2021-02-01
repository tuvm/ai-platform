import React, { useState, useEffect } from 'react';
import { DatePicker, Table } from 'antd';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { actionFetchBillingSummary } from './BillingAction';

let params = { _offset: 0, _limit: 25 };

const BillingSummary = () => {
  const { t } = useTranslation();
  const [isFetchingData, setFetchingData] = useState(false);
  const [summaryData, setSummaryData] = useState({
    data: [
      {
        id: '1',
        name: 'API LungCT',
        usage: 32,
        cost: 20000,
      },
      {
        id: '2',
        name: 'API LungCT 1',
        usage: 42,
        cost: 20000,
      },
      {
        id: '3',
        name: 'API LungCT 2',
        usage: 32,
        cost: 50000,
      },
    ],
    totalItem: 3,
  });

  useEffect(() => {
    params.date = moment(new Date()).startOf('month').unix();
    handleFetchData(params);
    return () => {
      params = { _offset: 0, _limit: 25 };
    };
  }, []);

  const handleFetchData = async (params = {}) => {
    try {
      setFetchingData(true);
      const { data } = await actionFetchBillingSummary(params);
      setSummaryData(data || {});
      setFetchingData(false);
    } catch (error) {
      setFetchingData(false);
    }
  };

  const handleChangeMonth = (date) => {
    params.date = date.unix();
    handleFetchData(params);
  };

  const formatCurrency = (value = '') => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const columns = [
    {
      title: 'Detail',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Usage (count)',
      dataIndex: 'usage',
      key: 'usage',
      align: 'center',
    },
    {
      title: 'Cost per request (VND)',
      dataIndex: 'cost',
      key: 'cost',
      align: 'right',
      render: (value) => <span>{formatCurrency(value)}</span>,
    },
    {
      title: 'Total (VND)',
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      render: (_, record) => (
        <span>{formatCurrency((record.usage || 0) * (record.cost || 0))}</span>
      ),
    },
  ];

  return (
    <div className="billing-summary">
      <div className="filter-bar">
        <div className="filter-name">{t('IDS_MONTH')}</div>
        <DatePicker
          className="select-month"
          picker="month"
          allowClear={false}
          defaultValue={moment(new Date())}
          format="MMMM YYYY"
          onChange={handleChangeMonth}
        />
      </div>
      <div className="summary-header">
        <div className="header-title">{t('IDS_SUMMARY')}</div>
        <div className="total-summary">{formatCurrency(234089)} VND</div>
      </div>
      <Table
        className="billing-summary-table"
        pagination={false}
        loading={isFetchingData}
        columns={columns}
        dataSource={summaryData.data || []}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default BillingSummary;
