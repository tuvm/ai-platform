import React, { Component } from 'react';
import { Query, Builder, Utils as QbUtils } from 'react-awesome-query-builder';
import { Button, Typography } from 'antd';

// For AntDesign widgets only:
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import 'antd/dist/antd.css'; // or import "react-awesome-query-builder/css/antd.less";
// For Material-UI widgets only:

import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles

// Choose your skin (ant/material/vanilla):
const InitialConfig = AntdConfig; // or MaterialConfig or BasicConfig
const { Title } = Typography;

// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  fields: {
    modality: {
      label: 'Modality',
      type: 'multiselect',
      fieldSettings: {
        listValues: [
          { value: 'CT', title: 'CT' },
          { value: 'MR', title: 'MR' },
          { value: 'CR', title: 'CR' },
          { value: 'DR', title: 'DR' },
          { value: 'DX', title: 'DX' },
          { value: 'MG', title: 'MG' },
          { value: 'Other', title: 'Other' },
        ],
      },
      valueSources: ['value'],
      preferWidgets: ['number'],
    },
    have_job_id: {
      label: 'JobId?',
      type: 'boolean',
      operators: ['equal'],
      valueSources: ['value'],
    },
  },
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: 'group' };

class Rules extends Component {
  state = {
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
  };

  render = () => (
    <div>
      <Title level={3}>Setup the DICOM keyword filtering</Title>
      <div className="button">
        <Button type="primary" style={{ margin: 5 }}>
          Import Json
        </Button>
        <Button type="primary" style={{ margin: 5 }}>
          Export Json
        </Button>
        <Button type="primary" style={{ margin: 5 }}>
          Reset
        </Button>
      </div>
      <Query
        {...config}
        value={this.state.tree}
        onChange={this.onChange}
        renderBuilder={this.renderBuilder}
      />
      {this.renderResult(this.state)}
    </div>
  );

  renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: '10px' }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  renderResult = ({ tree: immutableTree, config }) => (
    <div className="query-builder-result">
      <div>
        Tree: <pre>{JSON.stringify(immutableTree)}</pre>
      </div>
      <div>
        Query string:{' '}
        <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre>
      </div>
      <div>
        MongoDb query:{' '}
        <pre>
          {JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}
        </pre>
      </div>
      <div>
        SQL where:{' '}
        <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre>
      </div>
      <div>
        JsonLogic:{' '}
        <pre>
          {JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}
        </pre>
      </div>
      <div>
        ElasticSearch:{' '}
        <pre>
          {JSON.stringify(QbUtils.elasticSearchFormat(immutableTree, config))}
        </pre>
      </div>
    </div>
  );

  onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    this.setState({ tree: immutableTree, config: config });

    const jsonTree = QbUtils.getTree(immutableTree);
    console.log(jsonTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };
}

export default Rules;
