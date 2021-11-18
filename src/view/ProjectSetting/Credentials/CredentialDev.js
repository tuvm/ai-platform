import React from 'react';
import { Input, Space, message, Button } from 'antd';
import { Typography, Table } from 'antd';
import './Credentials.scss';

import {
    CopyOutlined
} from '@ant-design/icons';

const { Column } = Table;


const { Title, Text } = Typography;

const quotations = [
    {
        api_name: "Vindr ChestXray",
        quota: 100,
        period: 'daily'
    },
    {
        api_name: "Vindr SpineXR",
        quota: 100,
        period: 'daily'
    },
    {
        api_name: "Vindr Mammogram",
        quota: 100,
        period: 'daily'
    },
    {
        api_name: "Vindr Lung CT",
        quota: 100,
        period: 'daily'
    }
]

export default function Analysis(data = {}) {
    data = {
        apikey: 'ae96d426-91ac-4511-a11b-79db15390921-ae96d426-91ac-4511-a11b-79db15390921-ae96d426-91ac-4511-a11b-79db15390921-ae96d426-91ac-4511-a11b-79db15390921',
        createdTime: '05/15/2021 19:20:15 PM',
        endTime: '05/15/2023 19:20:15 PM',
        status: 'active'
    }



    const handleCopy = () => {
        navigator.clipboard.writeText(data.apikey).then(function () {
            message.success('Copied API key');
        }, function (err) {
            message.error('Could not copy API Key: ');
        });
    }

    return (
        <div>
            <div>
                <Space direction="vertical">
                    <Title level={5}>Đa khoa Phú Thọ - DEV</Title>
                    <Text>Create time: {data.createdTime}</Text>
                    <Text>End time: {data.endTime}</Text>
                    <Text>Status: {data.status}</Text>
                </Space>

            </div>
            <div className="credential-key-input">
                <Input value={data.apikey} style={{ paddingRight: '40px' }} disabled />
                <CopyOutlined
                    style={{ fontSize: '20px' }}
                    className="copy-button"
                    onClick={handleCopy}
                />
            </div>

            <div className="credential-quotations-table">
                <Space direction="vertical">
                    <Text strong>API quotations</Text>
                    <Text type="secondary">Limit the number of requests you can make to call API in the period</Text>
                </Space>

                <Table dataSource={quotations} className="app-table quotation-table" pagination={false}>
                    <Column title="API Name" dataIndex="api_name" key="api_name" />
                    <Column title="Quota" dataIndex="quota" key="quota" />
                    <Column title="Period" dataIndex="period" key="period" />
                </Table>
            </div>

            <div className="credential-footer">

            <Space size={16}>
                <Button type="">Delete</Button>
                <Button type="">Revoke</Button>
                <Button type="primary">Edit</Button>
            </Space>
            </div>
        </div>
    );
}