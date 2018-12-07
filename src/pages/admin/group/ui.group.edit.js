import { Checkbox, Form, Icon, Input, Modal, Row, Col } from 'antd';
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
        // 拼装请求
        const req = {
          "group_id": values.group_id,
          "data": {
            "group_name": values.group_name,
            "rights": values.rights
          },
        }
        this.props.handleEditGroupSubmit(req);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // 获取数据
    const { record } = this.props;
    const { group_id, group_name, rights: rightslist = [] } = record || {};
    const currights = rightslist.map(item => item.right_id);

    // 权限列表初始化
    const { rights = [] } = this.props;
    const cols = rights.map((item, index) => {
      return (
        <Col span={8} key={index}>
          <Checkbox title={item.api} value={item.id}>{item.description}</Checkbox>
        </Col>
      )
    })
    return (
      <Modal
        title="编辑用户组"
        visible={this.props.visibleEditGroupModal}
        onOk={this.handleSubmit.bind(this)}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.handleEditGroupCancel}
      >
        <Form onSubmit={this.handleSubmit} >
          <FormItem style={{ display: "none" }}>
            {getFieldDecorator('group_id', {
              initialValue: group_id
            })(
              <Input type="hidden" />
            )}
          </FormItem>

          <FormItem
            label="用户组名称"
          >
            {getFieldDecorator('group_name', {
              rules: [{ required: true, message: '请输入名称' }],
              initialValue: group_name
            })(
              <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入名称" />
            )}
          </FormItem>

          <FormItem
            label="用户组权限"
          >
            {getFieldDecorator('rights', {
              rules: [{ required: true, message: '请选择权限' }],
              initialValue: currights
            })(
              <CheckboxGroup>
                <Row>
                  {cols}
                </Row>
              </CheckboxGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const WrappedLoginForm = Form.create()(EditGroup);
export default WrappedLoginForm
