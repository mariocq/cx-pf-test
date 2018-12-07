import { Avatar, Card, Icon, Table, Modal } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';
import SetPassword from './ui.set.password';
import router from 'umi/router';

class Profile extends React.Component {
  state = {
    visiblePasswordModal: false,
  }

  handleSetPasswordOpen() {
    this.setState({ visiblePasswordModal: true })
  }

  handleSetPasswordSubmit(oldPassword, newPassword) {
    const { token } = this.props;
    // 获取实时数据
    this.props.dispatch({
      type: 'global/setpassword',
      payload: { token, old: oldPassword, new: newPassword },
      callback: ({ msg }) => {
        Modal.success({
          title: "提示信息",
          content: "修改密码成功！"
        })
        this.setState({ visiblePasswordModal: false })
      },
      onError: ({ msg }) => {
        Modal.error({
          title: "提示信息",
          content: msg
        })
      },
    })
  }
  handleSetPasswordCancel() {
    this.setState({ visiblePasswordModal: false })
  }
  render() {
    const { profile, id, records = [] } = this.props;
    const { name, group, lastLoginTime } = profile;
    const time = moment(lastLoginTime).format("YYYY-MM-DD HH:mm");

    const columns = [{
      title: '时间',
      dataIndex: 'op_time',
      width: 230
    }, {
      title: '用户',
      dataIndex: 'account',
      width: 250
    }, {
      title: '登录IP',
      dataIndex: 'remote_ip',
    }];
    const data = records;

    return (
      <div className={styles.normal}>
        <div className={styles.wrap}>
          <Card
            title="个人信息"
          >
            <div className={styles.head}>
              <Avatar size={72} style={{ backgroundColor: '#87d068' }} icon="user" />
            </div>
            <div className={styles.name}>
              {name}
            </div>
            <div className={styles.info}>
              <div className={styles.group}>
                <Icon type="user" />登录ID：{id}
              </div>
              <div className={styles.group}>
                <Icon type="contacts" />用户名：{name}
              </div>
              <div className={styles.group}>
                <Icon type="team" />用户组：{group}
              </div>
              <div className={styles.time}>
                <Icon type="clock-circle" />上次登录：{time}
              </div>
              <div className={styles.btns}>
                <Icon type="form" /><a href="javascript:;" onClick={this.handleSetPasswordOpen.bind(this)}>修改密码</a>
              </div>
              {group === "管理员" ?
                // 管理员可看到按钮
                <div className={styles.btns}>
                  <Icon type="solution" /><a href="javascript:;" onClick={() => router.push('/admin/user')}>用户管理</a>
                </div>
                : ""
              }
            </div>
          </Card>
        </div>
        <div className={`${styles.content}`}>
          <Card
            title="操作日志"
          >
            <Table
              rowKey="op_time"
              columns={columns}
              dataSource={data}
              pagination={{ defaultPageSize: 11 }}
            />
          </Card>
        </div>

        {/* 修改密码弹窗 */}
        <SetPassword
          visiblePasswordModal={this.state.visiblePasswordModal}
          handleSetPasswordSubmit={this.handleSetPasswordSubmit.bind(this)}
          handleSetPasswordCancel={this.handleSetPasswordCancel.bind(this)}
          confirmLoading={false}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { token, profile, id, records } = state.global;
  return {
    profile,
    token,
    id,
    records,
  };
}
export default connect(mapStateToProps)(Profile)
