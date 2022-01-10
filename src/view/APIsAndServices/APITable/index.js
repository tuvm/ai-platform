import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';
import { actionQueryAPIUsage } from '../actions';
import { useProjectsParams } from '../../../utils/hooks';
import { APIContext } from '../index';
import { useSelector } from 'react-redux';

export default function APITable() {
  const context = useContext(APIContext);
  const { filterDate, filterType } = context || {};
  const [tableData, setTableData] = useState([]);
  const { params: projectParams } = useProjectsParams();
  const resourceOptionsData = useSelector(
    (state) => state.system.resourceOptions
  );
  const resourceOptions = get(resourceOptionsData, 'options');

  useEffect(() => {
    if (resourceOptions) {
      handleFetchData();
    }
  }, [filterDate, filterType, resourceOptions]);

  const handleFetchData = async () => {
    try {
      const queryString = resourceOptions.map(
        (item) => `ai_model=${item.value}`
      );
      const endDate = filterDate.endDate || undefined;
      const startDate = filterDate.startDate || undefined;

      const projectId = get(projectParams, 'projectId', '');

      const params = {
        query_string: queryString.join(';'),
        start_date: startDate,
        end_date: endDate,
        interval: '1d',
        project_id: projectId,
      };

      const request1 = actionQueryAPIUsage({
        ...params,
        metric: 'requests',
      });
      const request2 = await actionQueryAPIUsage({
        ...params,
        metric: 'volume',
      });
      const request3 = actionQueryAPIUsage({
        ...params,
        metric: 'requests',
        audit: 'error',
      });

      Promise.all([request1, request2, request3]).then((allResults) => {
        console.log({ allResults });
        const reqData = get(allResults, '[0].data.datasets') || [];
        const volumeData = get(allResults, '[1].data.datasets') || [];
        const reqErrorData = get(allResults, '[2].data.datasets') || [];

        const data = reqData.map((item, index) => {
          const volumnSum = volumeData[index].value_sum;
          const reqErrorSum = reqErrorData[index].value_sum;

          const modelName = resourceOptions.filter(
            (it) => it.value === item.query_string.split('ai_model=')[1]
          )[0].label;
          return {
            key: item.query_string,
            name: modelName,
            reqSum: item.value_sum,
            reqErrorSum: reqErrorSum,
            volumeSum: (volumnSum / 1024 / 1024).toFixed(2),
          };
        });

        setTableData(data);
        console.log({ data });
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ tableData });

  return (
    <Table
      heads={[
        'IDS_API_TABLE_NAME',
        'IDS_API_TABLE_REQUEST',
        'IDS_API_TABLE_REQUEST_ERROR',
        'IDS_API_TABLE_VOLUME',
        // "IDS_API_TABLE_TIME",
      ]}
      content={tableData}
    />
  );
}

function Table(props) {
  const { t } = useTranslation();
  const { heads, content } = props;

  return (
    <table className="app-table">
      <thead>
        <tr>
          {heads &&
            heads.map((headTitle) => <th key={headTitle}>{t(headTitle)}</th>)}
        </tr>
      </thead>
      <tbody>
        {content &&
          content.map((item) => (
            <tr key={item.key}>
              <td>{item.name}</td>
              <td>{item.reqSum}</td>
              <td>{item.reqErrorSum}</td>
              <td>{item.volumeSum}</td>
              {/* <td>{item.time}</td> */}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
