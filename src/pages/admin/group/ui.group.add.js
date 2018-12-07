import { Checkbox, Form, Icon, Input, Modal, Row, Col } from 'antd';
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
        // 拼装请求
        const req = {
          "group_name": values.group_name,
          "rights": values.rights
        }
        this.props.handleAddGroupSubmit(req);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
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
            {getFieldDecorator('group_name', {
              rules: [{ required: true, message: '请输入名称' }]
            })(
              <Input prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入名称" />
            )}
          </FormItem>
          <FormItem
            label="用户组权限"
          >
            {getFieldDecorator('rights', {
              rules: [{ required: true, message: '请选择权限' }]
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

const WrappedLoginForm = Form.create()(AddGroup);
export default WrappedLoginForm
