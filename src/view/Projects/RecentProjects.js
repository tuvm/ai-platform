import React from 'react';
import ProjectBlock from './ProjectBlock';
import { Row, Col, Typography } from 'antd';
import AddNewProject from './AddNewProject';

const { Title } = Typography;

export default function RecentProjects() {
    return (
        <>
        <Title level={4}>Recent Projects</Title>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" sm={24} md={8}>
                    <AddNewProject />
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
        </>
    );
}