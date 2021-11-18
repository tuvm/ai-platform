import React, { useState } from 'react';
import { Modal, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import {
    Form, message, Button,
} from 'antd';
import { Input } from 'antd';

import '../ProjectSetting.scss';

// const { Option } = Select;


import Select, { components } from "react-select";

const options = [
    {
        label: "Owner",
        subLabel: "Full access to all resources, including user management, permissions and billing.",
        value: "owner"
    },
    {
        label: "Editor",
        subLabel: "",
        value: "editor"
    },
    {
        label: "Billing",
        subLabel: "",
        value: "billing"
    }
];

const Option = props => {
    return (
        <components.Option {...props}>
            <div>{props.data.label}</div>
            <div className="add-user-dropdown-sublabel">{props.data.subLabel}</div>
        </components.Option>
    );
};

const CustomStyle = {
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? '#39c2d74d' : '#fff',
        color: '#000',
        "&:hover": {
            backgroundColor: state.isSelected ? '#39c2d74d' : "#f1f1f1",
        },
    }),
    control: base => ({
        ...base,
        boxShadow: "none",
        '&:hover': {
            border: '1px solid #39C2D7',
            boxShadow: '0 0 0 2px rgb(57 194 215 / 20%)',
        }
    })
}


export default function CreateCredentialModal(props) {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    // const { Text, Link } = Typography;

    const handleOk = () => {
    };

    const handleCancel = () => {
        props.onCancel();
        form.resetFields()
    };

    const onSave = () => {

    }


    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    return (
        <div>
            <Modal title={t('IDS_ADD_MEMBER')}
                visible={true}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSave}>
                        Save
                    </Button>
                ]}
                width={1000}
            >

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Row gutter={[16]}>
                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                            <Form.Item
                                name="name"
                                label={t('IDS_EMAIL_ADDRESS')}
                                rules={[
                                    {
                                        required: true,
                                        type: "email",
                                        message: "Email address is invalid."
                                    }
                                ]}
                            >
                                <Input placeholder={t('IDS_EMAIL_ADDRESS')} style={{ height: 38 }} />
                            </Form.Item></Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }}>
                            <Form.Item
                                label={t('IDS_ROLE')}
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: "Role cannot be empty."
                                    }
                                ]}
                            >
                                <Select options={options} components={{ Option }}
                                    styles={CustomStyle}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#39c2d74d',
                                            primary: '#39C2D7',
                                        },
                                    })}
                                />

                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}