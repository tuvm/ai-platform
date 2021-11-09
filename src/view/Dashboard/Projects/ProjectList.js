import React from 'react';
import ProjectBlock from './ProjectBlock';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

export default function ProjectList() {
    return (
        <div>
            <Title level={4}>All Projects</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: 8 }}>
                <Col className="gutter-row" sm={24} md={8}>
                    <ProjectBlock />
                </Col>
                <Col className="gutter-row" sm={24} md={8}>
                    <ProjectBlock />
                </Col>
                <Col className="gutter-row" sm={24} md={8}>
                    <ProjectBlock />
                </Col>
                <Col className="gutter-row" sm={24} md={8}>
                    <ProjectBlock />
                </Col>
                <Col className="gutter-row" sm={24} md={8}>
                    <ProjectBlock />
                </Col>
                <Col className="gutter-row" sm={24} md={8}>
                    <ProjectBlock />
                </Col>
            </Row>
        </div>
    );
}