import React from "react";
import { useTranslation } from "react-i18next";
import './TableStyle.scss';

const demoTableContent = [
  {
    _id: "52434",
    name: "API LungCT",
    call: 544
  },
  {
    _id: "565844",
    name: "API Mammography",
    call: 100
  },
  {
    _id: "654434",
    name: "Chest Xray",
    call: 399
  },
  {
    _id: "674454",
    name: "Liver CT",
    call: 999
  },
];

export default function APITable() {
  return (
    <Table
      heads={[
        "IDS_TOP_API_TABLE_NAME",
        "IDS_TOP_API_TABLE_CALL",
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
                  <td>{item.call}</td>
              </tr>
          ))}
      </tbody>
    </table>
  );
}