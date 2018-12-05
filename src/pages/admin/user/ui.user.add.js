import React, { Component } from 'react';
import { Select, Form, Icon, Input, Modal } from 'antd';
import styles from './index.less';
const FormItem = Form.Item;
const Option = Select.Option;

class AddUser extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.visibleAddUserModal && this.props.form && nextProps.visibleAddUserModal !== this.props.visibleAddUserModal) {
      this.props.form.resetFields();
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.props.handleAddUserSubmit();
        console.log(values);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="新增用户"
        visible={this.props.visibleAddUserModal}
        onOk={this.handleSubmit.bind(this)}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.handleAddUserCancel}
      >
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            label="登录ID"
          >
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '请输入用于登录的ID（5-16位数字和字母）', pattern: /^[a-zA-Z0-9]{5,16}$/ }],
            })(
              <Input prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用于登录的ID" />
            )}
          </FormItem>
          <FormItem
            label="用户名"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入姓名' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入姓名" />
            )}
          </FormItem>
          <FormItem
            label="密码"
          >
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: '请输入密码（不少于6位的数字和字母）', pattern: /^[a-zA-Z0-9]{6,100}$/ }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            )}
          </FormItem>
          <FormItem
            label="用户组"
          >
            {getFieldDecorator('usergroup', {
              rules: [{ required: true, message: '请选择用户组' }],
            })(
              <Select
                mode="multiple"
              >
                <Option key={1} value="1">管理员</Option>
                <Option key={2} value="2">质检员</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedLoginForm = Form.create()(AddUser);
export default WrappedLoginForm
