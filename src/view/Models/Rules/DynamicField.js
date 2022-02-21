import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Divider, Button, Select, Input } from 'antd';

function DynamicField(props) {
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div
                key={field.key}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <Form.Item
                  name={[index, 'name']}
                  label="Name"
                  rules={[{ required: true }]}
                  style={{ minWidth: 200 }}
                >
                  <Input placeholder="field name" />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name={[index, 'type']}
                  rules={[{ required: true }]}
                  style={{ minWidth: 200 }}
                >
                  <Select>
                    <Select.Option value="text">String</Select.Option>
                    <Select.Option value="select">Select</Select.Option>
                    <Select.Option value="multiselect">
                      Multi Select
                    </Select.Option>
                    <Select.Option value="number">Number</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={[index, 'options']}
                  label="Options"
                  style={{ minWidth: 200 }}
                >
                  <Input placeholder="option 1, option 2, option 3" />
                </Form.Item>
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                    style={{ marginLeft: 20 }}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '60%' }}
              >
                <PlusOutlined /> Add field
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;
