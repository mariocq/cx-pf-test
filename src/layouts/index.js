import { Icon, Layout, Menu, Modal } from 'antd';
import styles from './index.less';
import router from 'umi/router';
import { connect } from 'dva';
import LeftMenu from './menu';
import withRouter from 'umi/withRouter';
const { Header, Sider, Content } = Layout;

class BasicLayout extends React.Component {
  state = {
    collapsed: false,  // 左侧菜单折叠状态
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });

    // 折叠动画完毕后触发
    setTimeout(() => {
      this.props.dispatch({
        type: 'images/randomHash'
      })
    }, 500);
  }

  render() {
    // 如果是登录页，采用简单框架
    if (this.props.location.pathname === '/login') {
      return <div>{this.props.children}</div>
    }
    // 内页采用默认系统框架
    return (
      <div className={styles.normal} id="components-layout-demo-custom-trigger">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.logo} />
            {/* 登录状态由”退出“按钮组件控制 */}
            <LeftMenu />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: "fit-content" }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default withRouter(connect()(BasicLayout));
