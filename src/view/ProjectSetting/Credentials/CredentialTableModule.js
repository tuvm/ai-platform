import React, { useEffect, useState } from 'react';
import { AutoComplete, Select } from 'antd';
import { ENV_OPTIONS } from '../../../utils/constants/config';
import get from 'lodash/get';
import find from 'lodash/find';
import { useSelector } from 'react-redux';

import './CredentialTableModule.scss';

const { Option } = Select;


const EditableTable = (props) => {
    const resourceList = useSelector(state => state.system.resourceList);
    const quotaDev = get(resourceList, 'quota_dev');

    // const handleDelete = (key) => {
    //     const newDataSource = [...dataSource];
    //     setDataSource(newDataSource.filter((item) => item.key !== key));
    // };

    const handleUpdatePeriodAndQuota = (row) => {
        const newData = [...props.quotaSelected];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        props.setQuotaSelected(newData);
    }

    useEffect(() => {
        if (!props.moduleSelected || (props.moduleSelected && props.moduleSelected.length === 0)) {
            props.setQuotaSelected([]);
            return;
        }

        let moduleSelectedFormated;
        const moduleSelected = props.moduleSelected;
        moduleSelectedFormated = moduleSelected.map(item => {
            const finder = find(quotaDev, { 'resource_id': item.id })
            const data = {
                id: item.id,
                name: item.name,
                quota: get(finder, 'quota'),
                period: get(finder, 'period')
            }
            return data;
        })

        if (props.env === ENV_OPTIONS.PRO) {
            const moduleSelected = props.moduleSelected;
            moduleSelectedFormated = moduleSelected.map(item => {
                const finder = find(quotaDev, { 'resource_id': item.id })
                const data = {
                    id: item.id,
                    name: item.name,
                    quota: get(finder, 'quota'),
                    period: get(finder, 'period')
                }
                return data;
            })

            moduleSelectedFormated = moduleSelectedFormated.map(item => {
                const filterItem = props.quotaSelected.find(el => el.id === item.id)
                if (filterItem) {
                    item.quota = filterItem.quota;
                    item.period = filterItem.period
                }
                return item;
            });
        }
        props.setQuotaSelected(moduleSelectedFormated);
    }, [props.moduleSelected, props.env, quotaDev])

    const { env } = props;

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
                        env === ENV_OPTIONS.PRO && props.quotaSelected && props.quotaSelected.map((row, i) => (
                            <TableRowEditable key={row.id} row={row} handleUpdatePeriodAndQuota={handleUpdatePeriodAndQuota} />
                        ))
                    }
                    {
                        env === ENV_OPTIONS.DEV && props.quotaSelected && props.quotaSelected.map((row, i) => (
                            <TableRow row={row} key={row.id} handleUpdatePeriodAndQuota={handleUpdatePeriodAndQuota} />
                        ))
                    }
                </tbody>

            </table>
        </div>
    );
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
        <tr key={row.id}>
            <td>{row.name}</td>
            <td>
                <AutoComplete
                    value={quotaValue}
                    options={[{ value: 'unlimited', label: 'Unlimited' }]}
                    style={{
                        width: '100%',
                    }}
                    onSelect={onSelectQuota}
                    filterOption={(inputValue, option) => option.value.toString().toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1}
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
                    <Option value="not_reset">Not reset</Option>
                </Select>
            </td>
        </tr>
    )
}

const TableRow = ({ row }) => {
    return (
        <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.quota}</td>
            <td>{row.period}</td>
        </tr>
    )
}

export default EditableTable;
