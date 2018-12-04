import { Col, Input, Modal, Row } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';

class SetPassword extends Component {
  componentWillReceiveProps(nextProps){
    if (nextProps.visiblePasswordModal && this.oldRef) {
      this.oldRef.input.value = "";
      this.newRef.input.value = "";
      this.reNewRef.input.value = "";
    }
  }
  handleSubmit() {
    const oldPassword = this.oldRef.input.value;
    const newPassword = this.newRef.input.value;
    const reNewPassword = this.reNewRef.input.value;
    if (!oldPassword || !newPassword || !reNewPassword) {
      Modal.warning({
        title: "提示信息",
        content: "请检查输入，不能为空！"
      })
      return;
    }
    if (newPassword !== reNewPassword) {
      Modal.warning({
        title: "提示信息",
        content: "请检查新密码和重复密码，两次输入不一致！"
      })
      return;
    }
    if (newPassword.length < 6) {
      Modal.warning({
        title: "提示信息",
        content: "请输入大于6位数的密码"
      })
      return;
    }
    this.props.handleSetPasswordSubmit(oldPassword, newPassword);
  }
  render() {
    return (
      <Modal
        title="修改密码"
        visible={this.props.visiblePasswordModal}
        onOk={this.handleSubmit.bind(this)}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.handleSetPasswordCancel}
      >
        <div className={styles.setPasswordWrap}>
          <Row gutter={16}>
            <Col span={6}>
              旧密码
              </Col>
            <Col span={18}>
              <Input type="password" ref={child => this.oldRef = child} />
            </Col>
            <Col span={6}>
              新密码
              </Col>
            <Col span={18}>
              <Input type="password" ref={child => this.newRef = child} />
            </Col>
            <Col span={6}>
              重复新密码
              </Col>
            <Col span={18}>
              <Input type="password" ref={child => this.reNewRef = child} />
            </Col>
          </Row>
        </div>
      </Modal>
    )
  }
}

export default SetPassword
