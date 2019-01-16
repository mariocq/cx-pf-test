import { Button, Form, Icon, Input, Modal } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';
const FormItem = Form.Item;

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'global/login',
          payload: values,
        })
      }
    });
  }

  componentDidMount() {
    // 初始化时清空login状态
    this.props.dispatch({
      type: 'global/clearlogin',
    })
  }

  componentDidUpdate() {
    const { login, msg } = this.props;
    if (login) {
      // 根据权限判断入库
      this.entryByAuth();
    }
    if (msg) {
      Modal.error({
        title: "登录失败",
        content: "您输入用户名密码不匹配，请检查后再尝试！",
      })

      // clear msg
      this.props.dispatch({
        type: 'global/clearmsg',
      })
    }
  }

  entryByAuth() {
    const { rights = [] } = this.props.profile;

    // 实时图片权限
    if (rights.filter(item => item.api === "/api/real-time-image").length > 0) {
      router.push('/realtime');
      return;
    }

    // 历史查询权限
    if (rights.filter(item => item.api === "/api/history").length > 0) {
      router.push('/history');
      return;
    }

    // 个人信息权限
    if (rights.filter(item => item.api === "/api/record/login").length > 0) {
      router.push('/profile');
      return;
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return (
      <div className={styles.normal}>
        <div className={styles.logo}></div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('user', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pwd', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <div className={styles.btnWrap}>
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
              登录系统
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);
function mapStateToProps(state) {
  const { login, msg, profile } = state.global;
  return {
    login,
    msg,
    profile,
    loading: state.loading.models.global,
  };
}

export default connect(mapStateToProps)(WrappedLoginForm)
