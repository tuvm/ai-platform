import React from 'react';
import { Card } from 'antd';
import './ProjectStyle.scss';
import { CloudFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const { Meta } = Card;

function ProjectBlock(props) {
    return (
        <Card
            hoverable
            style={{ width: '100%' }}
            onClick={() => props.history.push('/project/da-khoa-phu-tho/dashboard')}
        >
            <div className="project-block">
                <Meta title="Đa Khoa Phú Thọ" description="da-khoa-phu-tho" />
            </div>
            <CloudFilled key="setting" style={{ fontSize: '20px' }} />
        </Card>
    );
}


export default connect(
    (state) => { },
    null
)(withRouter(ProjectBlock));
