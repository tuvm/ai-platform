import React, { useEffect, useState } from 'react';
import { AutoComplete, Select } from 'antd';
import { QUOTA_DEV_TEMPLATE, ENV_OPTIONS } from '../../../utils/constants/config';
import get from 'lodash/get';

import './CredentialTableModule.scss';

const { Option } = Select;


export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };

    handleUpdatePeriodAndQuota = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.api_name === item.api_name);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            dataSource: newData,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        let moduleSelectedFormated;
        if (prevProps.moduleSelected !== this.props.moduleSelected) {
            const moduleSelected = this.props.moduleSelected;
            moduleSelectedFormated = moduleSelected.map(item => ({
                key: item,
                api_name: item,
                quota: get(QUOTA_DEV_TEMPLATE, `${item}.quota`),
                period: get(QUOTA_DEV_TEMPLATE, `${item}.period`)
            }));

            moduleSelectedFormated = moduleSelectedFormated.map(item => {
                const filterItem = this.state.dataSource.find(el => el.api_name === item.api_name)
                if (filterItem) {
                    item.quota = filterItem.quota;
                    item.period = filterItem.period
                }
                return item;
            })
            this.setState({ dataSource: moduleSelectedFormated });
        }

        if (prevProps.env !== this.props.env) {
            const moduleSelected = this.props.moduleSelected;
            moduleSelectedFormated = moduleSelected.map(item => ({
                key: item,
                api_name: item,
                quota: get(QUOTA_DEV_TEMPLATE, `${item}.quota`),
                period: get(QUOTA_DEV_TEMPLATE, `${item}.period`)
            }));
            this.setState({ dataSource: moduleSelectedFormated });
        }

    }

    render() {
        const { dataSource } = this.state;
        const { env } = this.props;

        return (
            <div className="create-credential-table-content">
                <table className="app-table">
                    <thead>
                        <tr>
                            <th style={{ width: '33%' }}>API name</th>
                            <th style={{ width: '33%' }}>Quota</th>
                            <th style={{ width: '33%' }}>Period</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            env === ENV_OPTIONS.PRO && dataSource && dataSource.map((row, i) => (
                                <TableRowEditable key={row.api_name + i} row={row} handleUpdatePeriodAndQuota={this.handleUpdatePeriodAndQuota} />
                            ))
                        }
                        {
                            env === ENV_OPTIONS.DEV && dataSource && dataSource.map((row, i) => (
                                <TableRow row={row} key={row.api_name + i} handleUpdatePeriodAndQuota={this.handleUpdatePeriodAndQuota} />
                            ))
                        }
                    </tbody>

                </table>
            </div>
        );
    }
}


const TableRowEditable = ({ row, handleUpdatePeriodAndQuota }) => {
    const [quotaValue, setQuotaValue] = useState('')
    const [periodValue, setPeriodValue] = useState('')

    useEffect(() => {
        setQuotaValue(row.quota)
        setPeriodValue(row.period)
    }, [row])


    const onSelectQuota = value => {
        setQuotaValue(value);
    }

    const onChangeQuota = value => {
        setQuotaValue(value);
        row.quota = value;
        handleUpdatePeriodAndQuota(row)
    }

    const handleSelectModule = value => {
        setPeriodValue(value);
        row.period = value;
        handleUpdatePeriodAndQuota(row)
    }

    return (
        <tr key={row.api_name}>
            <td>{row.api_name}</td>
            <td>
                <AutoComplete
                    value={quotaValue}
                    options={[{ value: 'Unlimited' }]}
                    style={{
                        width: '100%',
                    }}
                    onSelect={onSelectQuota}
                    filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                    onChange={onChangeQuota}
                    placeholder="Quota"
                    rules={[
                        {
                            required: true,
                        }
                    ]}
                />
            </td>
            <td>
                <Select
                    value={periodValue}
                    style={{ width: 120 }} onChange={handleSelectModule}
                >
                    <Option value="daily">Daily</Option>
                    <Option value="monthly">Monthly</Option>
                    <Option value="annualy">Annualy</Option>
                    <Option value="notreset">Not reset</Option>
                </Select>
            </td>
        </tr>
    )
}

const TableRow = ({ row }) => {
    return (
        <tr key={row.api_name}>
            <td>{row.api_name}</td>
            <td>{row.quota}</td>
            <td>{row.period}</td>
        </tr>
    )
}