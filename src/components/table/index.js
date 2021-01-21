import React from 'react';
import './table.scss';

export default function Table(props) {
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