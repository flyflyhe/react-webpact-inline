import {
    Button, Modal, Form, Input, DatePicker, Icon
} from 'antd';
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
            show:false,
            path:'',
        };

        uploadChange = (v) => {
            if (v.file.status === 'done') {
                console.log(v.file.response.path);
                this.props.form.setFieldsValue({img:v.file.response.path});
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
                visible, onCancel, onCreate, form,
            } = this.props;
            const { getFieldDecorator } = form;
            const rangeConfig = {
                rules: [{ type: 'array', required: true, message: 'Please select time!' }],
            };
            return (
                <Modal
                    width={800}
                    visible={visible}
                    title="新增活动配置"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="inline">
                        <Form.Item label="活动编号">
                            {getFieldDecorator('code', {
                                rules: [{ required: true, message: '活动编号不能为空' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="活动名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '名称不能为空' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="排序设置">
                            {getFieldDecorator('sort', {
                                initialValue: "1",
                                rules: [{ required: true, message: '' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item label="弹窗次数">
                            {getFieldDecorator('click_limit', {
                                initialValue: "10000",
                                rules: [{ required: true, message: '' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="时间选择"
                        >
                            {getFieldDecorator('time', rangeConfig)(
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
                                initialValue: "1"
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

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);

            values.start_date = values.time[0].format('YYYY-MM-DD HH:mm:ss');
            values.end_date = values.time[1].format('YYYY-MM-DD HH:mm:ss');
            if (values.img !== undefined && values.img.file && values.img.file.response.path) {
                values.img = values.img.file.response.path;
            } else {
                values.img = null;
                alert('图片不能为空');
                return null;
            }
            Axios.post(process.env.REACT_APP_BASE_URI+'/l3admin/alert-config/post', values).then(() => {
                alert('添加成功');
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert('编号不能重复');
                return null;
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
                <div>
                    <Button type="primary" style={{marginLeft:'92%'}} onClick={this.showModal}>新增</Button>
                </div>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    img={""}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default CollectionsPage;