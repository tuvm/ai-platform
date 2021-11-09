import React from 'react';
import { Card } from 'antd';
import './ProjectStyle.scss';
import { CloudFilled } from '@ant-design/icons';

const { Meta } = Card;

export default function ProjectBlock() {
    return (
        <Card
            hoverable
            style={{ width: '100%' }}
        >
            <div className="project-block">
                <Meta title="Đa Khoa Phú Thọ" description="da-khoa-phu-tho" />
            </div>
            <CloudFilled key="setting"  style={{ fontSize: '20px' }} />
        </Card>
    );
}