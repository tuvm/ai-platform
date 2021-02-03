import React from "react";
import { useTranslation } from "react-i18next";

const demoTableContent = [
  {
    _id: "52434",
    name: "API LungCT",
    type: "abc",
    request: 123,
    size: '13.5Kb',
    time: "34ms",
  },
  {
    _id: "565844",
    name: "API Mammography",
    type: "abc",
    request: 123,
    size: '13.5Kb',
    time: "34ms",
  },
  {
    _id: "654434",
    name: "API LungCT",
    type: "abc",
    request: 123,
    size: '13.5Kb',
    time: "34ms",
  },
  {
    _id: "674454",
    name: "API LungCT",
    type: "abc",
    request: 123,
    size: '13.5Kb',
    time: "34ms",
  },
];

export default function APITable() {
  return (
    <Table
      heads={[
        "IDS_API_TABLE_NAME",
        "IDS_API_TABLE_TYPE",
        "IDS_API_TABLE_REQUEST",
        "IDS_API_TABLE_SIZE",
        "IDS_API_TABLE_TIME",
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
                  <td>{item.type}</td>
                  <td>{item.request}</td>
                  <td>{item.size}</td>
                  <td>{item.time}</td>
              </tr>
          ))}
      </tbody>
    </table>
  );
}