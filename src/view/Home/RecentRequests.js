import React from "react";
import moment from 'moment';
import { useTranslation } from "react-i18next";
import './TableStyle.scss';

const demoTableContent = [
  {
    _id: "52434",
    name: "API LungCT",
    time: moment(new Date()).format('MM-DD-YYY HH:mm:ss'),
    status: 'Success'
  },
  {
    _id: "565844",
    name: "API Mammography",
    time: moment(new Date()).format('MM-DD-YYY HH:mm:ss'),
    status: 'Success'
  },
  {
    _id: "654434",
    name: "Chest Xray",
    time: moment(new Date()).format('MM-DD-YYY HH:mm:ss'),
    status: 'Success'
  },
  {
    _id: "674454",
    name: "Liver CT",
    time: moment(new Date()).format('MM-DD-YYY HH:mm:ss'),
    status: 'Success'
  },
];

export default function APITable() {
  return (
    <Table
      heads={[
        "IDS_API_TABLE_NAME",
        "IDS_API_TABLE_TIME",
        "IDS_API_TABLE_STATUS",
      ]}
      content={demoTableContent}
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
              <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.time}</td>
                  <td>{item.status}</td>
              </tr>
          ))}
      </tbody>
    </table>
  );
}