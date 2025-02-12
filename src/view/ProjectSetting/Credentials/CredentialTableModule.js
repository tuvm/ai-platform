import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AutoComplete, Select } from 'antd';
import { ENV_OPTIONS, PERIOD_SELECTION } from '../../../utils/constants/config';
import get from 'lodash/get';
import find from 'lodash/find';
import { useSelector } from 'react-redux';
import { getPeriodSelected } from '../../../utils/constants/config';

import './CredentialTableModule.scss';

const { Option } = Select;


const EditableTable = (props) => {
    const { t } = useTranslation();
    const resourceList = useSelector(state => state.system.resourceList);
    const quotaDev = get(resourceList, 'quota_dev');
    const vindrModules = get(resourceList, 'modules');

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
                period: get(finder, 'period'),
            }
            return data;
        })

        if (props.env === ENV_OPTIONS.prod) {
            const moduleSelected = props.moduleSelected;
            moduleSelectedFormated = moduleSelected.map(item => {
                const finder = find(quotaDev, { 'resource_id': item.id })
                const data = {
                    id: item.id,
                    name: item.name,
                    quota: get(finder, 'quota'),
                    period: get(finder, 'period'),
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
                        <th style={{ width: '33%' }}>Quota{env === ENV_OPTIONS.dev? "": "*"}</th>
                        <th style={{ width: '33%' }}>Period</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        env === ENV_OPTIONS.prod && props.quotaSelected && props.quotaSelected.map((row, i) => (
                            <TableRowEditable vindrModules={vindrModules} 
                                              key={row.id} 
                                              row={row} 
                                              currentStoredQuotas={props.currentStoredQuotas}
                                              handleUpdatePeriodAndQuota={handleUpdatePeriodAndQuota} />
                        ))
                    }
                    {
                        env === ENV_OPTIONS.dev && props.quotaSelected && props.quotaSelected.map((row, i) => (
                            <TableRow row={row} key={row.id} vindrModules={vindrModules} handleUpdatePeriodAndQuota={handleUpdatePeriodAndQuota} />
                        ))
                    }
                </tbody>

            </table>
            {
                (env === ENV_OPTIONS.prod && props.quotaSelected.length > 0)? <p class="hint" dangerouslySetInnerHTML={{ __html: '* ' + t('IDS_QUOTA_UNLIMITED_HINT') }}></p>: ""
            }
        </div>
    );
}


const TableRowEditable = ({ row, handleUpdatePeriodAndQuota, currentStoredQuotas }) => {
    const { t } = useTranslation();
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
        row.error = value !== 'unlimited' && parseInt(value)+''!==value
        setQuotaValue(value);
        row.quota = value;
        handleUpdatePeriodAndQuota(row)
    }

    const handleSelectModule = value => {
        setPeriodValue(value);
        row.period = value;
        handleUpdatePeriodAndQuota(row)
    }

    const periodDisabled = row => {
        let include = (currentStoredQuotas || []).includes(row.id);
        return include;
    }

    return (
        <tr key={row.id}>
            <td><span class="label">{row.name}</span></td>
            <td>
                <AutoComplete
                    value={quotaValue}
                    options={[{ value: 'unlimited', label: 'unlimited' }]}
                    style={{
                        width: '100%',
                    }}
                    onSelect={onSelectQuota}
                    filterOption={(inputValue, option) => option.value.toString().toUpperCase().indexOf(inputValue.toString().toUpperCase()) !== -1}
                    onChange={onChangeQuota}
                    placeholder="Quota"
                />
                {
                    row.error ? <p class="error">* {t('IDS_QUOTA_VALIDATE_ERROR')}</p> : ""
                }
            </td>
            <td>
                <Select
                    disabled={periodDisabled(row)}
                    value={periodValue}
                    style={{ width: 120 }} onChange={handleSelectModule}
                >
                    {
                        PERIOD_SELECTION.map(item => (
                            <Option value={item.value} key={item.value}>{item.label}</Option>
                        ))
                    }
                </Select>
            </td>
        </tr>
    )
}

const TableRow = ({ row, vindrModules}) => {
    return (
        <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.quota}</td>
            <td>{getPeriodSelected(row.period).label}</td>
        </tr>
    )
}

export default EditableTable;
