import React, { Component, useEffect, useState } from 'react';
import { Query, Builder, Utils as QbUtils } from 'react-awesome-query-builder';
import { Button, Typography, Form, Input, Divider, Modal, message } from 'antd';
import DynamicField from './DynamicField';
import { clone } from 'lodash';
import tags from './tags';

// For AntDesign widgets only:
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import 'antd/dist/antd.css'; // or import "react-awesome-query-builder/css/antd.less";
// For Material-UI widgets only:

import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles
import { getRule } from '../actions';
import { useModelsParams } from '../../../utils/hooks';
import CopyToClipboard from 'react-copy-to-clipboard';

// Choose your skin (ant/material/vanilla):
const InitialConfig = AntdConfig; // or MaterialConfig or BasicConfig
const { Title } = Typography;

// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  fields: {
    tag: {
      label: 'Dicom Tag',
      tooltip: 'Group of fields',
      type: '!struct',
      subfields: tags.reduce(
        (base, it) => ({
          ...base,
          [it]: {
            label: it,
            type: 'text',
            valueSources: ['value'],
            preferWidgets: ['text'],
          },
        }),
        {}
      ),
      //   Modality: {
      //     label: 'Modality',
      //     type: 'multiselect',
      //     fieldSettings: {
      //       listValues: [
      //         { value: 'CT', title: 'CT' },
      //         { value: 'MR', title: 'MR' },
      //         { value: 'CR', title: 'CR' },
      //         { value: 'DR', title: 'DR' },
      //         { value: 'DX', title: 'DX' },
      //         { value: 'MG', title: 'MG' },
      //         { value: 'Other', title: 'Other' },
      //       ],
      //     },
      //     valueSources: ['value'],
      //     preferWidgets: ['number'],
      //   },
    },
    have_job_id: {
      label: 'JobId?',
      type: 'boolean',
      // operators: ['equal', 'not_equal'],
      valueSources: ['value'],
    },
  },
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = { id: QbUtils.uuid(), type: 'group' };

const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
  },
};

const Rules = () => {
  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
  });

  const [form] = Form.useForm();
  const [isCustomField, setIsCustomField] = useState(false);
  const [jsonLogic, setLogic] = useState({});
  const { params } = useModelsParams();

  useEffect(() => {
    // getRule(params.projectId, params.model)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  function handleFinish(values) {
    const newConfig = clone(state.config);
    for (let i = 0; i < values.fields.length; i++) {
      newConfig.fields.tag.subfields[values.fields[i].name] = {
        label: values.fields[i].name,
        type: values.fields[i].type,
        valueSources: ['value'],
        preferWidgets: [values.fields[i].type],
        // operators: ['equal'],
        fieldSettings: {
          listValues:
            values.fields[i].type === 'select' ||
            values.fields[i].type === 'multiselect'
              ? values.fields[i].options.split(',').map((it) => it.trim())
              : null,
        },
      };
    }
    setState({
      tree: QbUtils.checkTree(QbUtils.loadTree(state.tree), newConfig),
      config: newConfig,
    });
  }

  const renderBuilder = (props) => (
    <div className="query-builder-container" style={{ padding: '10px' }}>
      <div className="query-builder qb-lite">
        <Builder {...props} />
      </div>
    </div>
  );

  const renderResult = ({ tree: immutableTree, config }) => (
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

  const onChange = (immutableTree, config) => {
    // console.log(config);
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    setState({ tree: immutableTree, config: config });
    const { logic } = QbUtils.jsonLogicFormat(state.tree, state.config);
    setLogic(logic);

    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  };

  const onSave = () => {
    const { logic } = QbUtils.jsonLogicFormat(state.tree, state.config);
    console.log(logic);
  };

  return (
    <div>
      <Title level={3}>Setup the DICOM keyword filtering</Title>
      <div
        className="button"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <Button type="primary" style={{ margin: 5 }}>
            Import Json
          </Button>
          <CopyToClipboard
            text={JSON.stringify(jsonLogic, null, 2)}
            onCopy={(_text, result) => {
              if (result) {
                message.success('Copied to clipboard');
              } else {
                message.error('Copy failed');
              }
            }}
          >
            <Button type="primary" style={{ margin: 5 }} onClick={() => {}}>
              Export Json
            </Button>
          </CopyToClipboard>

          <Button type="primary" style={{ margin: 5 }}>
            Reset
          </Button>
        </div>
        <Button
          type="primary"
          style={{ margin: 5 }}
          onClick={() => setIsCustomField(true)}
        >
          Custom Dicom Tags
        </Button>
      </div>
      <Query
        {...state.config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <Button type="primary" onClick={onSave}>
        Save
      </Button>
      {/* {renderResult(state)} */}
      <Modal
        visible={isCustomField}
        width="90vw"
        onCancel={() => setIsCustomField(false)}
        onOk={() => {
          form.submit();
          setIsCustomField(false);
        }}
        // footer={[
        //   onClick={}>Cancel</Button>,
        //   <Button
        //     form={form}
        //     key="submit"
        //     htmlType="submit"
        //     type="primary"
        //     onClick={() => {
        //       form.submit();
        //       setIsCustomField(false);
        //     }}
        //   >
        //     Submit
        //   </Button>,
        // ]}
      >
        <div>
          <Title level={3}>Custom Fields</Title>
          <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
            <DynamicField />
            {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Rules;
