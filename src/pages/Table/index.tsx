import React, {ReactNode, useEffect, useRef, useState} from "react";

import axios from "axios";
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import {Input, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import {ICounter} from "../../models/ITableCounter";
import {createIntl, ProTable, TableDropdown} from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';


const enLocale = {
    tableForm: {
        search: 'Query',
        reset: 'Reset',
        submit: 'Submit',
        collapsed: 'Expand',
        expand: 'Collapse',
        inputPlaceholder: 'Please enter',
        selectPlaceholder: 'Please select',
    },
    alert: {
        clear: 'Clear',
    },
    tableToolBar: {
        leftPin: 'Pin to left',
        rightPin: 'Pin to right',
        noPin: 'Unpinned',
        leftFixedTitle: 'Fixed the left',
        rightFixedTitle: 'Fixed the right',
        noFixedTitle: 'Not Fixed',
        reset: 'Reset',
        columnDisplay: 'Column Display',
        columnSetting: 'Settings',
        fullScreen: 'Full Screen',
        exitFullScreen: 'Exit Full Screen',
        reload: 'Refresh',
        density: 'Density',
        densityDefault: 'Default',
        densityLarger: 'Larger',
        densityMiddle: 'Middle',
        densitySmall: 'Compact',
    },
};
const enUSIntl = createIntl('en_US', enLocale);
// const columns: ColumnsType<ICounter> = [
//     {   dataIndex: "devEui", title: "DevEui"},
//     {   dataIndex: "freq", title: "Частота, GHz"},
//     {   dataIndex: "gatewayId", title: "Идентификатор шлюза"},
//     {	dataIndex: "nomerShetchika", title: "Номер счетчика"},
//     {	dataIndex: "obratniyPotok", title: "Обратный поток, м3"},
//     {	dataIndex: "potreblenie", title: " Прямой поток, м3"},
//     {	dataIndex: "rssi", title: "RSSI, dBm"},
//     {	dataIndex: "signal", title: "Сигнал"},
//     {	dataIndex: "statusAlarm", title: "Сигнал тревоги о состоянии"},
//     {	dataIndex: "statusShetchika", title: "Статус счетчика"},
//     {	dataIndex: "voltageLevel", title: "Уровень напряжения"}
// ];
type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
        name: string;
        color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
};

// @ts-ignore
// @ts-ignore
const columns: ProColumns<GithubIssueItem>[] = [
    // {
    //     dataIndex: 'index',
    //     valueType: 'indexBorder',
    //     width: 48,
    // },
    {
        title: 'Дата',
        dataIndex: 'date',
        ellipsis: true,
    },
    {
        title: 'DevEui',
        dataIndex: 'devEui',
        ellipsis: true,
    },
    {
        title: 'Частота, GHz',
        dataIndex: 'freq',
        ellipsis: true,
    },
    {
        title: 'Идентификатор шлюза',
        dataIndex: 'gatewayId',
        ellipsis: true,
    },
    {
        title: 'Номер счетчика',
        dataIndex: 'nomerShetchika',
        ellipsis: true,
    },
    {
        title: 'Обратный поток, м3',
        dataIndex: 'obratniyPotok',
        ellipsis: true,
    },
    {
        title: 'Прямой поток, м3',
        dataIndex: 'potreblenie',
        ellipsis: true,
    },
    {
        title: 'RSSI, dBm',
        dataIndex: 'rssi',
        ellipsis: true,
    },
    {
        title: 'Сигнал',
        dataIndex: 'signal',
        ellipsis: true,
    },
    {
        title: 'Сигнал тревоги о состоянии',
        dataIndex: 'statusAlarm',
        ellipsis: true,
    },
    {
        title: 'Статус счетчика',
        dataIndex: 'statusShetchika',
        ellipsis: true,
    },
    {
        title: 'Уровень напряжения',
        dataIndex: 'voltageLevel',
        ellipsis: true,
    },

    // {
    //     disable: true,
    //     title: 'status',
    //     dataIndex: 'state',
    //     filters: true,
    //     onFilter: true,
    //     ellipsis: true,
    //     valueType: 'select',
    //     valueEnum: {
    //         all: { text: 'Super long'.repeat(50) },
    //         open: {
    //             text: 'Unresolved',
    //             status: 'Error',
    //         },
    //         closed: {
    //             text: 'Resolved',
    //             status: 'Success',
    //             disabled: true,
    //         },
    //         processing: {
    //             text: 'Solving',
    //             status: 'Processing',
    //         },
    //     },
    // },
    // {
    //     disable: true,
    //     title: 'label',
    //     dataIndex: 'labels',
    //     search: false,
    //     renderFormItem: (_: any, {defaultRender}: any) => {
    //         return <Input placeholder="Please enter test" />;
    //     },
    //
    //     render: (_:ReactNode, record:GithubIssueItem) => (
    //         <Space>
    //             {record.labels.map(({ name, color }) => (
    //                 <Tag color={color} key={name}>
    //                     {name}
    //                 </Tag>
    //             ))}
    //         </Space>
    //     ),
    // },
    // {
    //     title: "showTime",
    //     key: 'showTime',
    //     dataIndex: 'created_at',
    //     valueType: 'date',
    //     sorter: true,
    //     hideInSearch: true,
    // },
    // {
    //     title: 'Creation time',
    //     dataIndex: 'created_at',
    //     valueType: 'dateRange',
    //     hideInTable: true,
    //     search: {
    //         transform: (value:any) => {
    //             return {
    //                 startTime: value[0],
    //                 endTime: value[1],
    //             };
    //         },
    //     },
    // },
    // {
    //     title: 'operation',
    //     valueType: 'option',
    //     key: 'option',
    //     render: (text: any, record: { id: any; url: string | undefined; }, _: any, action: { startEditable: (arg0: any) => void; reload: () => any; }) => [
    //         <a
    //             key="editable"
    //             onClick={() => {
    //                 action?.startEditable?.(record.id);
    //             }}
    //         >
    //             edit
    //         </a>,
    //         <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
    //             view
    //         </a>,
    //         <TableDropdown
    //             key="actionGroup"
    //             onSelect={() => action?.reload()}
    //             menus={[
    //                 { key: 'copy', name: 'copy' },
    //                 { key: 'delete', name: 'delete' },
    //             ]}
    //         />,
    //     ],
    // },
];
function TableCounter() {
    const socket = useRef()
    const actionRef = useRef<ActionType>();
    const [tableData, setTableData] = useState<ICounter[]>([])
    useEffect(()=>{
        const ws = new W3CWebSocket('ws://10.0.10.42:9090/echo/test')
        ws.onopen = () =>{
            console.log("webSocket connected")
        }
        ws.onmessage = (mes:any) =>{
            const res = JSON.parse(mes.data)
            setTableData((prev)=>[...prev, res])
        }
        return () => {
            ws.close();
        }
    },[])
    useEffect(()=>{
        axios.get<ICounter[]>('http://10.0.10.42:56435/history').then((value)=>{
            setTableData(value.data)
        })
    },[])
    return (
        <>
            {/*<Table*/}
            {/*    pagination={{*/}
            {/*        defaultPageSize: 10*/}
            {/*    }}*/}
            {/*    dataSource={tableData}*/}
            {/*    columns={columns}*/}
            {/*/>*/}
            <ProTable<ICounter>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                dataSource={tableData}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    onChange(value:any) {
                        console.log('value: ', value);
                    },
                }}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                form={{
                    // Due to the configuration of transform, the submitted participation is different from the defined one. Here you need to transform it.
                    syncToUrl: (values:Record<any, any>, type:"get"|"set") => {
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    pageSize: 5,
                    onChange: (page:number) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="Advanced form"

            />
        </>


    )
}

export default TableCounter;