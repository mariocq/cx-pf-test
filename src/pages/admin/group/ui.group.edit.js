import { Form, Icon, Input, Modal, Checkbox } from 'antd';
import React, { Component } from 'react';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class EditGroup extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.visibleEditGroupModal && this.props.form && nextProps.visibleEditGroupModal !== this.props.visibleEditGroupModal) {
      this.props.form.resetFields();
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.props.handleEditGroupSubmit();
        console.log(values);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { record } = this.props;
    const { id, name, pwd } = record || {};

    const options = [
      { label: '实时窗口', value: '/api/real-time-image' },
      { label: '图片查询', value: '/api/history' },
      { label: '用户列表', value: '/api/user/all' },
      { label: '用户组列表', value: '/api/usergroup/all' },
    ];
    return (
      <Modal
        title="编辑用户组"
        visible={this.props.visibleEditGroupModal}
        onOk={this.handleSubmit.bind(this)}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.handleEditGroupCancel}
      >
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            label="登录ID"
          >
            {getFieldDecorator('id', {
              rules: [{ required: true, message: '请输入用于登录的ID（5-16位数字和字母）', pattern: /^[a-zA-Z0-9]{5,16}$/ }],
              initialValue: id
            })(
              <Input readOnly={true} prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用于登录的ID" />
            )}
          </FormItem>
          <FormItem
            label="用户组"
          >
            {getFieldDecorator('usergroup', {
              rules: [{ required: true, message: '请选择用户组' }],
              initialValue: ["1", "2"]
            })(
              <CheckboxGroup options={options} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedLoginForm = Form.create()(EditGroup);
export default WrappedLoginForm
