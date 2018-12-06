import { Avatar, Card, Popconfirm, Table, Modal, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import AddUser from './ui.user.add';
import EditUser from './ui.user.edit';
import router from 'umi/router';

class AdminUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditUserOpen = this.handleEditUserOpen.bind(this);
  }
  state = {
    visibleAddUserModal: false,
    visibleEditUserModal: false,
    recordEditUserModal: null,
  }

  handleEditUserOpen(record) {
    this.setState({ visibleEditUserModal: true, recordEditUserModal: record })
  }
  handleEditUserSubmit(req) {
    this.props.dispatch({
      type: 'adminUser/edit',
      payload: req,
      callback: (data) => {
        this.setState({ visibleEditUserModal: false, recordEditUserModal: null })
        if (data.msg === "ok") {
          // 提示
          Modal.success({
            title: "提示信息",
            content: "编辑用户成功！"
          })

          // 更新用户列表
          this.props.dispatch({
            type: 'adminUser/fetch'
          });
        }
      },
    })
  }
  handleEditUserCancel() {
    this.setState({ visibleEditUserModal: false, recordEditUserModal: null })
  }

  handleAddUserOpen() {
    this.setState({ visibleAddUserModal: true })
  }

  handleAddUserSubmit(req) {
    this.props.dispatch({
      type: 'adminUser/add',
      payload: req,
      callback: (data) => {
        this.setState({ visiblePasswordModal: false })
        if (data.msg === "ok") {
          // 提示
          Modal.success({
            title: "提示信息",
            content: "添加用户成功！"
          })

          // 更新用户列表
          this.props.dispatch({
            type: 'adminUser/fetch'
          });
        }
      },
    })
    this.setState({ visibleAddUserModal: false })
  }
  handleAddUserCancel() {
    this.setState({ visibleAddUserModal: false })
  }
  render() {
    const columns = [{
      title: '登录ID',
      dataIndex: 'account',
      width: 150
    }, {
      title: '用户名',
      dataIndex: 'user_name',
    }, {
      title: '用户组',
      dataIndex: 'group_name',
    }, {
      title: '上次登录时间',
      dataIndex: 'last_login_time',
      className: 'text-gray',
      width: 230
    }, {
      title: '操作',
      className: 'text-center',
      width: 236,
      render: (record) => {
        return (
          <div className={styles.btnWrap}>
            <Button icon="solution" onClick={() => this.handleEditUserOpen(record)}>编辑</Button>
            <Popconfirm title="你确认删除该用户吗？" okText="删除" cancelText="取消">
              <Button type="danger" icon="delete">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }];

    const { userList } = this.props;
    let data = [];
    if (userList) {
      data = userList.users;
    }
    return (
      <div className={styles.normal}>
        <Card
          title="用户管理"
          extra={
            <div>
              <Button icon="setting" style={{ marginRight: 15 }} onClick={() => router.push('/admin/group')}>管理用户组</Button>
              <Button icon="plus-circle" type="primary" onClick={this.handleAddUserOpen.bind(this)}>添加新用户</Button>
            </div>}
        >
          <Table
            size="small"
            rowKey="id"
            loading={this.props.loading}
            columns={columns}
            dataSource={data}
            pagination={{ defaultPageSize: 12 }}
          />
        </Card>

        {/* 新增弹窗 */}
        <AddUser
          visibleAddUserModal={this.state.visibleAddUserModal}
          handleAddUserSubmit={this.handleAddUserSubmit.bind(this)}
          handleAddUserCancel={this.handleAddUserCancel.bind(this)}
          groupList={this.props.groupList}
          confirmLoading={false}
        />

        {/* 编辑弹窗 */}
        <EditUser
          visibleEditUserModal={this.state.visibleEditUserModal}
          handleEditUserSubmit={this.handleEditUserSubmit.bind(this)}
          handleEditUserCancel={this.handleEditUserCancel.bind(this)}
          record={this.state.recordEditUserModal}
          groupList={this.props.groupList}
          confirmLoading={false}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list: userList } = state.adminUser;
  const { list: groupList } = state.adminGroup;
  const loading = state.loading.effects["adminUser/fetch"];

  return {
    userList,
    groupList,
    loading,
  };
}
export default connect(mapStateToProps)(AdminUser)
