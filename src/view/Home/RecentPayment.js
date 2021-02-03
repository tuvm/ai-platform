import React from "react";
import moment from 'moment';

import { useTranslation } from "react-i18next";

const demoTableContent = [
  {
    _id: "52434",
    name: "API LungCT",
    time: "1.288.400đ",
    date:  moment(new Date()).format('MM-DD-YYY HH:mm:ss'),
  },
  {
    _id: "565844",
    name: "API Mammography",
    time: "1.288.400đ",
    date:  moment(new Date()).format('MM-DD-YYY HH:mm:ss'),
  },
  {
    _id: "654434",
    name: "Chest Xray",
    time: "1.288.400đ",
    date:  moment(new Date()).format('MM-DD-YYY HH:mm:ss'),
  },
  {
    _id: "674454",
    name: "API LungCT",
    time: "1.288.400đ",
    date:  moment(new Date()).format('MM-DD-YYY HH:mm:ss'),
  },
];

export default function APITable() {
  return (
    <Table
      heads={[
        "IDS_RECENT_PAYMENT_TABLE_BILL",
        "IDS_RECENT_PAYMENT_TABLE_AMOUNT",
        "IDS_RECENT_PAYMENT_TABLE_DATE",
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
                  <td>{item.date}</td>
              </tr>
          ))}
      </tbody>
    </table>
  );
}