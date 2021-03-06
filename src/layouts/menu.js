import { Icon, Layout, Menu, Modal } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import styles from './index.less';
const { Sider } = Layout;

class Component extends React.Component {
  componentDidMount() {
    const { login } = this.props;
    if (!login) {
      router.push('/login');
    }
  }

  componentDidUpdate() {
    const { login } = this.props;
    if (!login) {
      router.push('/login');
    }
  }

  /**
   * 退出系统
   */
  handleLogout = () => {
    Modal.confirm({
      title: '您确定退出本系统吗？',
      content: '点击确定退出',
      okText: '确定',
      cancelText: '返回',
      onOk: () => {
        const { token, user } = this.props;
        this.props.dispatch({
          type: 'global/logout',
          payload: { token, user }
        })
      }
    });
  }

  menuRenderByAuth() {
    const { rights = [] } = this.props.profile
    const meuns = [];

    // 实时图片权限
    if (rights.filter(item => item.api === "/api/real-time-image").length > 0) {
      meuns.push(
        <Menu.Item key="1" onClick={() => router.push('/realtime')}>
          <Icon type="video-camera" />
          <span>实时窗口</span>
        </Menu.Item>
      )
    }

    // 历史查询权限
    if (rights.filter(item => item.api === "/api/history").length > 0) {
      meuns.push(
        <Menu.Item key="2" onClick={() => router.push('/history')}>
          <Icon type="search" />
          <span>图片查询</span>
        </Menu.Item>
      )
    }
    return meuns;
  }

  render() {
    const menus = this.menuRenderByAuth();

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <div className={styles.logo} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {menus}
          <Menu.Item key="3" onClick={() => router.push('/profile')}>
            <Icon type="user" />
            <span>用户信息</span>
          </Menu.Item>
          <Menu.Item key="4" onClick={this.handleLogout.bind(this)}>
            <Icon type="logout" />
            {/* 登录状态由”退出“按钮组件控制 */}
            <span>退出系统</span>
          </Menu.Item>
        </Menu>
      </Sider >
    );
  }
}

function mapStateToProps(state) {
  const { login, token, id, profile } = state.global;
  return {
    login,
    token,
    profile,
    user: id,
    loading: state.loading.models.global,
  };
}
export default withRouter(connect(mapStateToProps)(Component));
