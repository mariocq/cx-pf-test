import { Avatar, Card, Popconfirm, Table, Modal, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';
import AddUser from './ui.user.add';
import EditUser from './ui.user.edit';
import router from 'umi/router';


const data = [{
  id: 'John',
  name: 'John Brown1',
  time: "2018-12-03 15:28:10",
  action: 'New York No. 1 Lake Park',
}, {
  id: 'Jim Green2',
  name: 'Jim Green2',
  time: "2018-12-02 15:28:10",
  action: 'London No. 1 Lake Park',
}, {
  id: 'Joe Black3',
  name: 'Joe Black3',
  time: "2018-12-01 15:28:10",
  action: 'Sidney No. 1 Lake Park',
}, {
  name: 'Jim Green4',
  time: "2018-12-02 15:28:10",
  action: 'London No. 1 Lake Park',
}, {
  name: 'Joe Black5',
  time: "2018-12-01 15:28:10",
  action: 'Sidney No. 1 Lake Park',
}, {
  name: 'Jim Green6',
  time: "2018-12-02 15:28:10",
  action: 'London No. 1 Lake Park',
}, {
  name: 'Joe Black7',
  time: "2018-12-01 15:28:10",
  action: 'Sidney No. 1 Lake Park',
}, {
  name: 'Jim Green8',
  time: "2018-12-02 15:28:10",
  action: 'London No. 1 Lake Park',
}, {
  name: 'Joe Black9',
  time: "2018-12-01 15:28:10",
  action: 'Sidney No. 1 Lake Park',
}, {
  name: 'Jim Green10',
  time: "2018-12-02 15:28:10",
  action: 'London No. 1 Lake Park',
}, {
  name: 'Joe Black11',
  time: "2018-12-01 15:28:10",
  action: 'Sidney No. 1 Lake Park',
}, {
  name: 'Jim Green12',
  time: "2018-12-02 15:28:10",
  action: 'London No. 1 Lake Park',
}, {
  name: 'Joe Black13',
  time: "2018-12-01 15:28:10",
  action: 'Sidney No. 1 Lake Park',
}
];

class Admin extends React.Component {
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
  handleEditUserSubmit(oldPassword, newPassword) {
    const { token } = this.props;
    this.setState({ visibleEditUserModal: false, recordEditUserModal: null })
  }
  handleEditUserCancel() {
    this.setState({ visibleEditUserModal: false, recordEditUserModal: null })
  }

  handleAddUserOpen() {
    this.setState({ visibleAddUserModal: true })
  }

  handleAddUserSubmit(oldPassword, newPassword) {
    const { token } = this.props;
    this.setState({ visibleAddUserModal: false })
  }
  handleAddUserCancel() {
    this.setState({ visibleAddUserModal: false })
  }
  render() {
    const columns = [{
      title: '登录ID',
      dataIndex: 'id',
      width: 200
    }, {
      title: '用户名',
      dataIndex: 'name',
      width: 200
    }, {
      title: '用户组',
      dataIndex: 'action',
    }, {
      title: '上次登录时间',
      dataIndex: 'time',
      className: 'text-gray',
      width: 230
    }, {
      title: '操作',
      className: 'text-center',
      render: (record) => {
        return (
          <div className={styles.btnWrap}>
            <Button icon="solution" onClick={()=> this.handleEditUserOpen(record)}>编辑</Button>
            <Button icon="team">用户组</Button>
            <Popconfirm title="你确认删除该用户吗？" okText="删除" cancelText="取消">
              <Button type="danger" icon="delete">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }];

    return (
      <div className={styles.normal}>
        <Card
          title="用户管理"
          extra={<Button type="primary" onClick={this.handleAddUserOpen.bind(this)}>添加新用户</Button>}
        >
          <Table
            rowKey="name"
            columns={columns}
            dataSource={data}
            pagination={{ defaultPageSize: 11 }}
          />
        </Card>

        {/* 新增弹窗 */}
        <AddUser
          visibleAddUserModal={this.state.visibleAddUserModal}
          handleAddUserSubmit={this.handleAddUserSubmit.bind(this)}
          handleAddUserCancel={this.handleAddUserCancel.bind(this)}
          confirmLoading={false}
        />

        {/* 编辑弹窗 */}
        <EditUser
          visibleEditUserModal={this.state.visibleEditUserModal}
          handleEditUserSubmit={this.handleEditUserSubmit.bind(this)}
          handleEditUserCancel={this.handleEditUserCancel.bind(this)}
          record={this.state.recordEditUserModal}
          confirmLoading={false}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { token, profile } = state.global;
  return {
    profile,
    token,
  };
}
export default connect(mapStateToProps)(Admin)
