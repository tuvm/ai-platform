import React, { Component, useEffect, useState } from 'react';
import { Query, Builder, Utils as QbUtils } from 'react-awesome-query-builder';
import { Button, Typography, Form, Input, Divider, Modal, message } from 'antd';
import DynamicField from './DynamicField';
import { clone, get } from 'lodash';
import tags from './tags';

// For AntDesign widgets only:
import AntdConfig from 'react-awesome-query-builder/lib/config/antd';
import 'antd/dist/antd.css'; // or import "react-awesome-query-builder/css/antd.less";
// For Material-UI widgets only:

import 'react-awesome-query-builder/lib/css/styles.css';
import 'react-awesome-query-builder/lib/css/compact_styles.css'; //optional, for more compact styles
import { createRule, getRule } from '../actions';
import { useModelsParams } from '../../../utils/hooks';
import CopyToClipboard from 'react-copy-to-clipboard';
import { SLUG_TO_MODEL } from '../../../utils/constants/config';
import defaultRules from './defaultRules';

// Choose your skin (ant/material/vanilla):
const InitialConfig = AntdConfig; // or MaterialConfig or BasicConfig
const { Title } = Typography;
const { TextArea } = Input;

// You need to provide your own config. See below 'Config format'
const config = {
  ...InitialConfig,
  operators: {
    ...InitialConfig.operators,
    equal: {
      ...InitialConfig.operators.equal,
      label: 'In',
      labelForFormat: 'in',
      jsonLogic: 'in',
    },
    like: {
      ...InitialConfig.operators.equal,
      label: 'Contain',
      labelForFormat: 'contain',
      jsonLogic: 'contain',
    },
  },
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
            operators: ['equal', 'like'],
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
  const [importForm] = Form.useForm();
  const [isCustomField, setIsCustomField] = useState(false);
  const [isImportJson, setIsImportJson] = useState(false);
  const [jsonLogic, setLogic] = useState({});
  const { params } = useModelsParams();

  useEffect(() => {
    getRule(params.projectId, params.model).then((res) => {
      const rule = get(res, 'data.[0].original_rules');
      if (rule) {
        setState({
          tree: QbUtils.checkTree(
            QbUtils.loadFromJsonLogic(rule, state.config),
            state.config
          ),
          config: state.config,
        });
      } else {
        try {
          if (params && params.model) {
            const model = SLUG_TO_MODEL[params.model];
            if (model) {
              const defaultRule = defaultRules[model];
              setState({
                tree: QbUtils.checkTree(
                  QbUtils.loadFromJsonLogic(defaultRule, state.config),
                  state.config
                ),
                config: state.config,
              });
              createRule(params.projectId, params.model, defaultRule)
                .then((res) => {
                  message.success('Rule is set to default');
                })
                .catch((err) => {
                  message.error('Can not load default rule');
                });
            }
          }
        } catch (err) {
          message.error('Can not load default rule');
        }
      }
    });
  }, []);

  function handleResetRule() {
    try {
      if (params && params.model) {
        const model = SLUG_TO_MODEL[params.model];
        if (model) {
          const defaultRule = defaultRules[model];
          setState({
            tree: QbUtils.checkTree(
              QbUtils.loadFromJsonLogic(defaultRule, state.config),
              state.config
            ),
            config: state.config,
          });
          message.success('Rule is reset to default. Please save it.');
        }
      }
    } catch (err) {
      message.error('Can not reset rule.');
    }
  }

  function handleImport(values) {
    try {
      const json = JSON.parse(values.json);
      if (json) {
        setState({
          tree: QbUtils.checkTree(
            QbUtils.loadFromJsonLogic(json, state.config),
            state.config
          ),
          config: state.config,
        });
        message.success('Rule is imported. Please save it.');
      }
    } catch (err) {
      message.error('Invalid format');
    }
  }

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
    createRule(params.projectId, params.model, logic)
      .then((res) => {
        message.success('Saved successfully');
      })
      .catch((err) => {
        message.error('Save failed');
      });
  };

  return (
    <div>
      <Title level={3}>Setup the DICOM keyword filtering</Title>
      <div
        className="button"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div>
          <Button
            type="primary"
            style={{ margin: 5 }}
            onClick={() => setIsImportJson(true)}
          >
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

          <Button
            type="primary"
            style={{ margin: 5 }}
            onClick={handleResetRule}
          >
            Reset
          </Button>
          <Button type="primary" style={{ margin: 5 }} onClick={onSave}>
            Save
          </Button>
          <Button
            type="primary"
            style={{ margin: 5 }}
            onClick={() => setIsCustomField(true)}
          >
            Custom Dicom Tags
          </Button>
        </div>
      </div>
      <Query
        {...state.config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      {/* {renderResult(state)} */}
      <Modal
        visible={isCustomField}
        width="80vw"
        onCancel={() => setIsCustomField(false)}
        onOk={() => {
          form.submit();
          setIsCustomField(false);
        }}
      >
        <div>
          <Title level={4}>Custom Fields</Title>
          <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
            <DynamicField />
          </Form>
        </div>
      </Modal>

      <Modal
        visible={isImportJson}
        width={600}
        onCancel={() => setIsImportJson(false)}
        onOk={() => {
          importForm.submit();
          setIsImportJson(false);
        }}
      >
        <div>
          <Title level={4}>Import Json</Title>
          <Form
            form={importForm}
            // {...defaultFormItemLayout}
            onFinish={handleImport}
          >
            <Form.Item name="json" rules={[{ required: true }]}>
              <TextArea name="json" rows={20} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Rules;
