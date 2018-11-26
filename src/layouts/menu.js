import { connect } from 'dva';
import router from 'umi/router';
import withRouter from 'umi/withRouter';

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

  render() {
    return (
      <span>退出系统</span>
    );
  }
}

function mapStateToProps(state) {
  const { login } = state.global;
  return {
    login,
    loading: state.loading.models.global,
  };
}
export default withRouter(connect(mapStateToProps)(Component));
