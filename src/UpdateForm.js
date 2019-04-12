import {
    Button, Modal, Form, Input, DatePicker, Icon
} from 'antd';
import * as moment from 'moment';
import React from 'react';
import Upload from "antd/es/upload";
import Select from "antd/es/select";
import Axios from 'axios';
const {RangePicker } = DatePicker;
const {Option} = Select;
const {TextArea} = Input;

const CollectionCreateForm = Form.create({ name: 'alert_create' })(
    class inLine extends React.Component {
        state={
            //show:false,
            path:'',
        };

        constructor(props) {
            super(props);
            this.state.show = parseInt(this.props.record.url_type) === 2
        }

        uploadChange = (v) => {
            if (v.file.status === 'done') {
                console.log(v.file);
                this.state.path = v.file.response.path;
            }
        };

        handleChange = (value) => {
            if (2 === parseInt(value)) {
                this.state.show = true;
            } else {
                this.state.show = false;
            }
        };

        render() {
            const {
                visible, onCancel, onCreate, form,record,
            } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal
                    width={800}
                    visible={visible}
                    title="新增活动配置"
                    okText="更新"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="inline">
                        <Form.Item label="活动编号">
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: '活动编号不能为空' }],
                                initialValue:record.code,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="活动名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '名称不能为空' }],
                                initialValue:record.name,
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="排序设置">
                            {getFieldDecorator('sort', {
                                initialValue: record.sort,
                                rules: [{ required: true, message: '' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="弹窗次数">
                            {getFieldDecorator('click_limit', {
                                initialValue: record.click_limit,
                                rules: [{ required: true, message: '' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="时间选择"
                        >
                            {getFieldDecorator('time', {
                                rules: [{ type: 'array', required: true, message: 'Please select time!' }],
                                initialValue: [
                                    moment(record.start_date),
                                    moment(record.end_date)
                                ]
                            })(
                                <RangePicker showTime={true} format="YYYY-MM-DD HH:mm:ss" />
                            )}
                        </Form.Item>
                        <br/>
                        <Form.Item
                            label="图片选择"
                        >
                            {getFieldDecorator('img', {
                            })(
                                <Upload action={process.env.REACT_APP_BASE_URI+"/l3admin/file/upload"}
                                        onChange={this.uploadChange}
                                >
                                    <Button type="ghost">
                                        <Icon type="upload" />点击上传
                                    </Button>
                                </Upload>
                            )}
                        </Form.Item>
                        <br/>
                        <Form.Item label="跳转连接">
                            {getFieldDecorator('url_type', {
                                initialValue: ''+record.url_type
                            })(
                                <Select style={{ width: 120 }} onChange={this.handleChange}>
                                    <Option value="1">支付中心</Option>
                                    <Option value="2">自定义链接</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <br/>
                        {
                            this.state.show ? <Form.Item label="自定义链接" >
                                {getFieldDecorator('url', {
                                    initialValue:record.url
                                })(
                                    <TextArea />
                                )}
                            </Form.Item> : ''
                        }

                    </Form>
                </Modal>
            );
        }
    }
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };

    constructor(props) {
        super(props);
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            values.id = this.props.record.id;
            values.start_date = values.time[0].format('YYYY-MM-DD HH:mm:ss');
            values.end_date = values.time[1].format('YYYY-MM-DD HH:mm:ss');
            if (values.img && values.img.file && values.img.file.response.path) {
                values.img = values.img.file.response.path;
            } else {
                delete values.img;
            }
            Axios.post(process.env.REACT_APP_BASE_URI+'/l3admin/alert-config/update', values).then(() => {
                alert('更新成功');
                window.location.reload();
            });

            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>编辑</Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    record={this.props.record}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default CollectionsPage;