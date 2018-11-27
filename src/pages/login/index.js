import { Button, Form, Icon, Input } from 'antd';
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

  componentDidUpdate() {
    const { login } = this.props;
    if (login) {
      router.push('/realtime');
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
  const { login } = state.global;
  return {
    login,
    loading: state.loading.models.global,
  };
}

export default connect(mapStateToProps)(WrappedLoginForm)
