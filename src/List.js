import React, {Component} from 'react';
import {Table, Divider, Tag, Button, Switch} from 'antd';
import Axios from 'axios';
import UpdateFrom from './UpdateForm';

class List extends Component {
    columns = [
        {
            title: '活动编号',
            dataIndex: 'code',
        }, {
            title: '名称',
            dataIndex: 'name',
        }, {
            title: '时间',
            dataIndex: 'date',
        }, {
            title: '当前图片',
            dataIndex: 'img',
            render: (v) => <img src={v} alt="" width={"100px"} height={"100px"}/>
        },
        {
            title: '跳转链接',
            dataIndex: 'url'
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (v) => parseInt(v) === 1 ? '开启' : '关闭'
        }, {
            title: '开关',
            dataIndex: 'enable',
            render: (v, record) => <Switch defaultChecked={parseInt(v) === 1} onChange={(bool, e) => this.onChange(bool, record)} />
        }, {
            title: '操作',
            render: (v, record) => <div>
                <UpdateFrom record={record} />
                <Button type={"danger"} onClick={() => this.onDelete(record)}>删除</Button>
            </div>
        }
    ];
    onDelete = (record) => {
        let id = record.id;
        Axios.post(process.env.REACT_APP_BASE_URI+'/l3admin/alert-config/delete', {id:id}).then((res) => {
            alert('删除成功');
            window.location.reload();
        });
    };

    onChange = (bool, record) => {
        let id = record.id;
        let newRecord = {id:id};
        newRecord.status = bool ? 1 : 0;
        this.update(newRecord);
    };

    update = (record) => {
        Axios.post(process.env.REACT_APP_BASE_URI+'/l3admin/alert-config/update', record).then((res) => {
            alert('更新成功');
            window.location.reload();
        });
    };

    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    state={
        data:[],
    };
    constructor(props) {
        super(props);
        Axios.get(process.env.REACT_APP_BASE_URI+'/l3admin/alert-config/list').then((res) => {
            console.log(res);
            this.setState({
                data: res.data
            })
        });
    }

    render() {
        return (
            <Table rowSelection={this.rowSelection} columns={this.columns} dataSource={this.state.data}/>
        );
    }
}

/*let data = [
    /!*{key: '1',
    code: '122',
    name: 'John Brown',
    date: 32,
    url: 'New York No. 1 Lake Park',
    status: 1,
    enable: 0,}*!/
];*/


export default List;