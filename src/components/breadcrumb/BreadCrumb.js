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
  const { t } = useTranslation();
  const { location } = props;

  useEffect(() => {
    const path = get(location, 'pathname') || '';
    const pathname = '/' + (path.split('/').reverse()[0] || '');
    let routeTree = [];
    APP_ROUTES.forEach((item) => {
      if (item.pathname === pathname) {
        routeTree.push(item.name);
        return;
      } else if (item.submenu) {
        const submenu = item.submenu;
        submenu.forEach((subItem) => {
          if (subItem.pathname === pathname) {
            routeTree.push(item.name);
            routeTree.push(subItem.name);
            return;
          }
        });
      }
    });

    // const name = get(routeTree, 'name');
    const list = ['IDS_APP_NAME', ...routeTree];
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
