import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "antd";
import isEmpty from 'lodash/isEmpty';
import RequestGraph from "./RequestGraph";
import { APIContext } from "./index";
import { actionQueryAPIUsage } from "../actions";
import { useProjectsParams } from '../../../utils/hooks';
import { mergeSeriesData } from './utils';
import get from 'lodash/get';

import "./Graphs.scss";

export default function Graphs() {
  const context = useContext(APIContext);
  const { filterDate, filterType } = context || {};
  const [requestData, setRequestData] = useState({});
  const [volumeData, setVolumeData] = useState({});
  const { params: projectParams } = useProjectsParams();

  useEffect(() => {
    if (filterDate && filterDate.startDate) {
      handleFetchData();
    }
    // eslint-disable-next-line
  }, [filterType, filterDate]);

  const handleFetchData = async () => {
    if (isEmpty(filterType)) {
      setRequestData({});
      setVolumeData({});
      return;
    }

    const projectId = get(projectParams, 'projectId', '');

    try {
      const queryString = [filterType, ].map((item) => `ai_model=${item}`);
      const params = {
        query_string: queryString.join(";"),
        start_date: filterDate.startDate || undefined,
        end_date: filterDate.endDate || undefined,
        interval: "1d",
        project_id: projectId,
      };

      const { data: rqData } = await actionQueryAPIUsage({
        ...params,
        metric: "requests",
      });

      const { data: rqErrorData } = await actionQueryAPIUsage({
        ...params,
        metric: "requests",
        audit: "error",
      });

      const rqMergedData = mergeSeriesData([rqData, rqErrorData], ["Total", "Error"]);
      console.log({rqMergedData})

      setRequestData(rqMergedData || {});

      const { data: volData } = await actionQueryAPIUsage({
        ...params,
        metric: "volume",
      });

      setVolumeData(volData || {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="graphs-list">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={{span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="graph-column">
            <div className="graph-name">Requests</div>
            <div className="graph-sublabel">Requests</div>
            <div>
              <RequestGraph
                data={requestData}
                filterType={filterType}
                label="Requests"
                graphType='request-call'
              />
            </div>
          </div>
        </Col>
        <Col className="gutter-row" xs={{span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="graph-column">
            <div className="graph-name">Volume</div>
            <div className="graph-sublabel">Megabytes</div>
            <div>
              <RequestGraph
                data={volumeData}
                filterType={filterType}
                graphType='request-size'
                label="Size"
              />
            </div>
          </div>
        </Col>
        {/* <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 8 }}>
          <div className="graph-column">
            <div className="graph-name">Time</div>
            <div>
              <RequestGraph />
            </div>
          </div>
        </Col> */}
      </Row>
    </div>
  );
}
