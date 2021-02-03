import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import RequestGraph from './RequestGraph';
import { APIContext } from './index';
import { actionQueryAPIUsage } from '../actions';

import './Graphs.scss';

export default function Graphs() {
  const context = useContext(APIContext);
  const { filterDate, filterType } = context || {};
  const [requestData, setRequestData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    if (filterDate && filterDate.startDate && filterType.length) {
      handleFetchData();
    }
    // eslint-disable-next-line
  }, [filterType, filterDate]);

  const handleFetchData = async () => {
    try {
      const params = {
        query_string: `ai_model=${filterType.join(',')}`,
        start_date: filterDate.startDate || undefined,
        end_date: filterDate.endDate || undefined,
        interval: '1d',
      };

      const { data: rqData } = await actionQueryAPIUsage({
        ...params,
        metric: 'requests',
      });

      console.log({ rqData });
      setRequestData(rqData || []);
      const { data: volData } = await actionQueryAPIUsage({
        ...params,
        metric: 'volume',
      });
      setVolumeData(volData || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="graphs-list">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="graph-column">
            <div className="graph-name">Requests</div>
            <div className="graph-sublabel">Requets (request/call)</div>
            <div>
              <RequestGraph
                data={{
                  labels: requestData[0]?.labels,
                  values: requestData[0]?.values,
                }}
                label="Requests"
              />
            </div>
          </div>
        </Col>
        <Col className="gutter-row" md={{ span: 24 }} lg={{ span: 12 }}>
          <div className="graph-column">
            <div className="graph-name">Size</div>
            <div className="graph-sublabel">Requets (request/MB)</div>
            <div>
              <RequestGraph
                data={{
                  labels: volumeData[0]?.labels,
                  values: (volumeData[0]?.values || []).map(
                    (vol) => vol / 1024 / 1024
                  ),
                }}
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
