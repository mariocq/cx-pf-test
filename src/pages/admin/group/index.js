import { Tag, Card, Popconfirm, Table, Modal, Button } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';
import AddGroup from './ui.group.add';
import EditGroup from './ui.group.edit';
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

class AdminGroup extends React.Component {
  constructor(props) {
    super(props);
    this.handleEditGroupOpen = this.handleEditGroupOpen.bind(this);
  }
  state = {
    visibleAddGroupModal: false,
    visibleEditGroupModal: false,
    recordEditGroupModal: null,
  }

  handleEditGroupOpen(record) {
    this.setState({ visibleEditGroupModal: true, recordEditGroupModal: record })
  }
  handleEditGroupSubmit(oldPassword, newPassword) {
    const { token } = this.props;
    this.setState({ visibleEditGroupModal: false, recordEditGroupModal: null })
  }
  handleEditGroupCancel() {
    this.setState({ visibleEditGroupModal: false, recordEditGroupModal: null })
  }

  handleAddGroupOpen() {
    this.setState({ visibleAddGroupModal: true })
  }

  handleAddGroupSubmit(oldPassword, newPassword) {
    const { token } = this.props;
    this.setState({ visibleAddGroupModal: false })
  }
  handleAddGroupCancel() {
    this.setState({ visibleAddGroupModal: false })
  }
  render() {
    const columns = [{
      title: '用户组',
      dataIndex: 'name',
      width: 150
    }, {
      title: '权限列表',
      dataIndex: 'time',
      className: 'text-gray',
      render: (record) => {
        return (
          <div>
            <Tag>实时窗口</Tag>
            <Tag>图片查询</Tag>
            <Tag>用户管理</Tag>
            <Tag>用户组管理</Tag>
          </div>
        )
      }
    }, {
      title: '操作',
      className: 'text-center',
      width: 236,
      render: (record) => {
        return (
          <div className={styles.btnWrap}>
            <Button icon="solution" onClick={() => this.handleEditGroupOpen(record)}>编辑</Button>
            <Popconfirm title="你确认删除该用户组吗？" okText="删除" cancelText="取消">
              <Button type="danger" icon="delete">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }];

    return (
      <div className={styles.normal}>
        <Card
          title="用户组管理"
          extra={
            <div>
              <Button icon="plus-circle" type="primary" style={{ marginRight: 15 }} onClick={this.handleAddGroupOpen.bind(this)}>添加用户组</Button>
              <Button icon="arrow-left" onClick={() => router.goBack()}>返回</Button>
            </div>
          }
        >
          <Table
            size="small"
            rowKey="name"
            columns={columns}
            dataSource={data}
            pagination={{ defaultPageSize: 11 }}
          />
        </Card>

        {/* 新增弹窗 */}
        <AddGroup
          visibleAddGroupModal={this.state.visibleAddGroupModal}
          handleAddGroupSubmit={this.handleAddGroupSubmit.bind(this)}
          handleAddGroupCancel={this.handleAddGroupCancel.bind(this)}
          confirmLoading={false}
        />

        {/* 编辑弹窗 */}
        <EditGroup
          visibleEditGroupModal={this.state.visibleEditGroupModal}
          handleEditGroupSubmit={this.handleEditGroupSubmit.bind(this)}
          handleEditGroupCancel={this.handleEditGroupCancel.bind(this)}
          record={this.state.recordEditGroupModal}
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
export default connect(mapStateToProps)(AdminGroup)
