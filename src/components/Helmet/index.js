import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { APP_ROUTES } from "../../utils/constants/config";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import { withRouter } from "react-router-dom";

function AppHelmet(props) {
  const { t } = useTranslation();
  const { location } = props;
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    const pathname = get(location, 'pathname') || '';
    const filter = APP_ROUTES.find((item) => item.pathname === pathname);
    const name = get(filter, "name");
    setPageName(name);
  }, [location]);

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{t('IDS_APP_NAME')} - {t(pageName)}</title>
      <link rel="canonical" href="https://vindr.ai" />
    </Helmet>
  );
}


export default withRouter(AppHelmet);