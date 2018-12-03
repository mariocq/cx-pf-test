import { Avatar, Button, Card, Icon, Table } from 'antd';
import styles from './index.less';

class Profile extends React.Component {
  render() {
    const { name, group, time } = this.props;

    const columns = [{
      title: '时间',
      dataIndex: 'time',
      width: 230
    }, {
      title: '用户',
      dataIndex: 'name',
      width: 200
    }, {
      title: '操作',
      dataIndex: 'action',
    }];
    const data = [{
      name: 'John Brown1',
      time: "2018-12-03 15:28:10",
      action: 'New York No. 1 Lake Park',
    }, {
      name: 'Jim Green2',
      time: "2018-12-02 15:28:10",
      action: 'London No. 1 Lake Park',
    }, {
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
              11{name}
            </div>
            <div className={styles.info}>
              <div className={styles.group}>
                <Icon type="team" />用户组：管理员{group}
              </div>
              <div className={styles.time}>
                <Icon type="clock-circle" />上次登录时间：2018-12-03 15:25:42{time}
              </div>
              <div className={styles.btns}>
                <Icon type="form" /><a href="javascript:;">修改密码</a>
              </div>
            </div>
          </Card>
        </div>
        <div className={`${styles.content}`}>
          <Card
            title="操作日志"
          >
            <Table
              rowKey="name"
              columns={columns}
              dataSource={data}
              pagination={{ defaultPageSize: 11 }}
            />
          </Card>
        </div>
      </div>
    );
  }
}
export default Profile;
