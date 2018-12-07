import { Button, Card, Popconfirm, Table, Tag, Modal } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
import AddGroup from './ui.group.add';
import EditGroup from './ui.group.edit';

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
  handleEditGroupSubmit(req) {
    this.props.dispatch({
      type: 'adminGroup/edit',
      payload: req,
      callback: (data) => {
        this.setState({ visibleEditGroupModal: false, recordEditGroupModal: null })
        if (data.msg === "ok") {
          // 提示
          Modal.success({
            title: "提示信息",
            content: "修改用户组成功！"
          })

          // 更新列表
          this.props.dispatch({
            type: 'adminGroup/fetch'
          });
        }
      },
    })
  }
  handleEditGroupCancel() {
    this.setState({ visibleEditGroupModal: false, recordEditGroupModal: null })
  }

  handleAddGroupOpen() {
    this.setState({ visibleAddGroupModal: true })
  }

  handleAddGroupSubmit(req) {
    this.props.dispatch({
      type: 'adminGroup/add',
      payload: req,
      callback: (data) => {
        this.setState({ visibleAddGroupModal: false })
        if (data.msg === "ok") {
          // 提示
          Modal.success({
            title: "提示信息",
            content: "添加用户组成功！"
          })

          // 更新列表
          this.props.dispatch({
            type: 'adminGroup/fetch'
          });
        }
      },
    })
  }
  handleAddGroupCancel() {
    this.setState({ visibleAddGroupModal: false })
  }

  handleDeleteGroupSubmit(group_id) {
    this.props.dispatch({
      type: 'adminGroup/delete',
      payload: { group_id },
      callback: (data) => {
        if (data.msg === "ok") {
          // 提示
          Modal.success({
            title: "提示信息",
            content: "删除用户组成功！"
          })

          // 更新用户列表
          this.props.dispatch({
            type: 'adminGroup/fetch'
          });
        }
      },
    })
    this.setState({ visibleAddUserModal: false })
  }

  render() {
    const columns = [{
      title: '用户组ID',
      dataIndex: 'group_id',
      width: 100
    }, {
      title: '用户组名称',
      dataIndex: 'group_name',
      width: 150
    }, {
      title: '权限列表',
      className: 'text-gray',
      render: (record) => {
        const { rights = [] } = record;
        const tags = rights.map((item, index) => {
          return <Tag key={index} title={item.api}>{item.desc}</Tag>
        })
        return tags;
      }
    }, {
      title: '操作',
      className: 'text-center',
      width: 236,
      render: (record) => {
        return (
          <div className={styles.btnWrap}>
            <Button icon="solution" onClick={() => this.handleEditGroupOpen(record)}>编辑</Button>
            <Popconfirm title="你确认删除该用户组吗？" okText="删除" cancelText="取消" onConfirm={() => this.handleDeleteGroupSubmit(record.group_id)}>
              <Button type="danger" icon="delete">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    }];

    const { groupList: data, rights } = this.props;

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
            rowKey="group_id"
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
          rights={rights}
        />

        {/* 编辑弹窗 */}
        <EditGroup
          visibleEditGroupModal={this.state.visibleEditGroupModal}
          handleEditGroupSubmit={this.handleEditGroupSubmit.bind(this)}
          handleEditGroupCancel={this.handleEditGroupCancel.bind(this)}
          record={this.state.recordEditGroupModal}
          confirmLoading={false}
          rights={rights}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list: groupList, rights } = state.adminGroup;
  return {
    groupList,
    rights,
  };
}
export default connect(mapStateToProps)(AdminGroup)
