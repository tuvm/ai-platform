import React from 'react';

export default function Devider(props) {
    const style = {
        margin: `${props.space ? props.space + 'px' : '25px'} 0`,
        width: '100%',
        height: '1px',
        background: '#f0f0f0',
    }
    return <div style={style}></div>;
}