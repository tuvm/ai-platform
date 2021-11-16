import React from 'react';
import ProjectBlock from './ProjectBlock';
import { Row, Col, Typography } from 'antd';
import AddNewProject from './AddNewProject';

const { Title } = Typography;

export default function RecentProjects({ data }) {
    return (
        <>
            <Title level={4}>Recent Projects</Title>
            <Row gutter={[16, 16]}>
                <Col className="gutter-row" xs={12} sm={24} md={8}>
                    <AddNewProject />
                </Col>
                {data && data.data && data.data.map(pro => (
                    <Col className="gutter-row" xs={12} sm={24} md={8} key={pro.id}>
                        <ProjectBlock data={pro} />
                    </Col>
                ))}
            </Row>
        </>
    );
}