import React, { useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import last from 'lodash/last';
import { withRouter } from 'react-router-dom';
import get from 'lodash/get';
import { APP_ROUTES } from '../../utils/constants/config';
import { useTranslation } from 'react-i18next';
import './BreadCrumb.scss';

const BreadCrumb = (props) => {
  const [breadcrumbList, setBreadcrumbList] = useState([]);
  const { t }  = useTranslation();
  const { location } = props;

  useEffect(() => {
    const { pathname } = location;
    const filter = APP_ROUTES.find(item => item.pathname === pathname)
    const name = get(filter, 'name');
    const list = ['IDS_APP_NAME', name];
    setBreadcrumbList(list);
  }, [location]);

  const lastItem = last(breadcrumbList) || '';

  return (
    <div className="breadcrumb-container">
      <Breadcrumb separator="/" className="breadcrumb-list">
        {breadcrumbList &&
          breadcrumbList.map((text, idx) => (
            <Breadcrumb.Item className="breadcrumb-item" key={idx}>
              {t(text)}
            </Breadcrumb.Item>
          ))}
      </Breadcrumb>
      <div className="page-name">{t(lastItem)}</div>
    </div>
  );
};

export default withRouter(React.memo(BreadCrumb));
