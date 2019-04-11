import React, {Component} from 'react';
import {Table, Divider, Tag, Button} from 'antd';
import Axios from 'axios';

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
            title: '跳转链接',
            dataIndex: 'url'
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (v) => parseInt(v) === 1 ? '开启' : '关闭'
        }, {
            title: '开关',
            dataIndex: 'enable',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '操作',
            render: () => <div>
                <Button>编辑</Button>
                <Button color={"red"}>删除</Button>
            </div>
        }
    ];

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
        Axios.get('http://link.cn/l3admin/alert-config/list').then((res) => {
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