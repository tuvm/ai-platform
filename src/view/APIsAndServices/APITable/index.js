import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import get from 'lodash/get';
import moment from 'moment';
import { API_SCOPES } from '../../../utils/constants/config';
import { actionQueryAPIUsage } from '../actions';
import { getModelName } from '../APIGraph/RequestGraph';

export default function APITable() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const queryString = API_SCOPES.map((item) => `ai_model=${item.key}`);
      const endDate = moment(new Date()).format('YYYYMMDD');
      const startDate = moment().subtract(365, "days").format("YYYYMMDD")

      const params = {
        query_string: queryString.join(";"),
        start_date: startDate,
        end_date: endDate,
        interval: "1d",
      };

      const request1 =  actionQueryAPIUsage({
        ...params,
        metric: "requests",
      });
      const request2 = await actionQueryAPIUsage({
        ...params,
        metric: "volume",
      });

      Promise.all([request1, request2]).then((allResults) => {
        console.log({ allResults });
        const reqData = get(allResults, '[0].data.datasets') || [];
        const volumeData = get(allResults, '[1].data.datasets') || [];

        const data = reqData.map((item, index) => {
          const volumnSum = volumeData[index].value_sum;

          return {
            key: item.query_string,
            name: getModelName(item.query_string),
            reqSum: item.value_sum,
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
        "IDS_API_TABLE_NAME",
        "IDS_API_TABLE_REQUEST",
        "IDS_API_TABLE_VOLUME",
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
          {content && content.map(item => (
              <tr key={item.key}>
                  <td>{item.name}</td>
                  <td>{item.reqSum}</td>
                  <td>{item.volumeSum}</td>
                  {/* <td>{item.time}</td> */}
              </tr>
          ))}
      </tbody>
    </table>
  );
}