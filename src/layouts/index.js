import styles from './index.less';
import router from 'umi/router';

import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;

class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    if (this.props.location.pathname === '/login') {
      return <div>{this.props.children}</div>
    }
    return (
      <div className={styles.normal} id="components-layout-demo-custom-trigger">
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.logo} />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" onClick={() => router.push('/realtime')}>
                <Icon type="video-camera" />
                <span>实时窗口</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={() => router.push('/history')}>
                <Icon type="search" />
                <span>图片查询</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={() => router.push('/profile')}>
                <Icon type="user" />
                <span>用户信息</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default BasicLayout;
