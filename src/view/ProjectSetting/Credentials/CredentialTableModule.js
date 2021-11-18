import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Select, Form } from 'antd';

import './CredentialTableModule.scss';
const { Option } = Select;


const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'API name',
                dataIndex: 'api_name',
                width: '30%',
            },
            {
                title: 'Quota',
                dataIndex: 'quota',
                editable: true,
                required: true,
                width: '30%',
            },
            {
                title: 'Period',
                dataIndex: 'period',
                width: '30%',
                render: (_, record) => {
                    const handleSelectModule = () => {

                    }
                    return (
                        <Select defaultValue="daily" style={{ width: 120 }} onChange={handleSelectModule}>
                            <Option value="none">None</Option>
                            <Option value="daily">Daily</Option>
                            <Option value="monthly">Monthly</Option>
                            <Option value="annualy">Annualy</Option>
                            <Option value="notreset">Not reset</Option>
                        </Select>
                    )
                }
            },
        ];
        this.state = {
            dataSource: [],
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    };

    // componentDidMount() {
    //     const moduleSelected = this.props.moduleSelected;
    //     const moduleSelectedFormated = moduleSelected.map(item => ({
    //         key: item,
    //         api_name: item,
    //         quota: '100',
    //         period: 'daily',
    //     }));

    //     this.setState({ dataSource: moduleSelectedFormated })
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.moduleSelected !== this.props.moduleSelected) {
            const moduleSelected = this.props.moduleSelected;

            let moduleSelectedFormated = moduleSelected.map(item => ({
                key: item,
                api_name: item,
                quota: '100',
                period: 'daily',
            }));

            moduleSelectedFormated = moduleSelectedFormated.map(item => {
                const filterItem = this.state.dataSource.find(el => el.api_name === item.api_name)
                if (filterItem) {
                    item.quota = filterItem.quota;
                    item.period = filterItem.period
                }
                return item;
            }) 
    
            this.setState({ dataSource: moduleSelectedFormated })
        }
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (
            <div className="create-credential-table-content">
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
            </div>
        );
    }
}