import { Checkbox, Form, Icon, Input, Modal } from 'antd';
import React, { Component } from 'react';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class AddGroup extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.visibleAddGroupModal && this.props.form && nextProps.visibleAddGroupModal !== this.props.visibleAddGroupModal) {
      this.props.form.resetFields();
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // this.props.handleAddGroupSubmit();
        console.log(values);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const options = [
      { label: '实时窗口', value: '/api/real-time-image' },
      { label: '图片查询', value: '/api/history' },
      { label: '用户列表', value: '/api/user/all' },
      { label: '用户组列表', value: '/api/usergroup/all' },
    ];
    return (
      <Modal
        title="新增用户组"
        visible={this.props.visibleAddGroupModal}
        onOk={this.handleSubmit.bind(this)}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.handleAddGroupCancel}
      >
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            label="用户组名称"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入姓名' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入姓名" />
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

const WrappedLoginForm = Form.create()(AddGroup);
export default WrappedLoginForm
