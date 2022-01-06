import React, { useState } from 'react';
import JsonViewer from 'searchable-react-json-view';
import { Modal, Input, message } from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';

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
    Modal.confirm({
      icon: null,
      title: title,
      width: 700,
      closable: true,
      content: <JsonViewContent data={data} />,
      cancelText: 'Close',
      okText: (
        <CopyToClipboard
          text={JSON.stringify(data, null, 2)}
          onCopy={(_text, result) => {
            if (result) {
              message.success('Copied to clipboard');
            } else {
              message.error('Copy failed');
            }
          }}
        >
          <span style={{ padding: '4px 15px' }}>Copy</span>
        </CopyToClipboard>
      ),
      okButtonProps: {
        style: { padding: 0 },
      },
    });
  },
};

export default JsonView;
