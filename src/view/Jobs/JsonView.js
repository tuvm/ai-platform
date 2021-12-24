import React, { useState } from 'react';
import JsonViewer from 'searchable-react-json-view';
import { Modal, Input } from 'antd';

let delayFunc;

const JsonViewContent = ({ data }) => {
  const [search, setSearch] = useState('');
  const onSearchChange = (e) => {
    clearTimeout(delayFunc);
    delayFunc = setTimeout(() => {
      setSearch(e.target.value);
    }, 200);
  };
  return (
    <div>
      <Input
        onChange={onSearchChange}
        spellCheck={false}
        placeholder="Keyword"
      />
      <div
        style={{
          height: 600,
          overflowY: 'scroll',
          marginTop: 10,
          border: '1px solid #d9d9d9',
          borderRadius: 2,
          padding: 5,
        }}
      >
        <JsonViewer
          src={data}
          highlightSearch={search}
          highlightCurrentSearchColor="#FE9B4A"
          displayObjectSize={false}
          displayDataTypes={false}
        />
      </div>
    </div>
  );
};

const JsonView = {
  open: (title, data) => {
    Modal.info({
      icon: null,
      title: title,
      width: 700,
      closable: true,
      content: <JsonViewContent data={data} />,
    });
  },
};

export default JsonView;
