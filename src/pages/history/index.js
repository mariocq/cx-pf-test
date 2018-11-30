import { connect } from 'dva';
import ImageList from './ui.image.list';
import SearchBar from './ui.search';
import styles from './index.less';

class HistoryList extends React.Component {
  componentDidMount() {
    const { token } = this.props;
    // 获取实时数据
    this.props.dispatch({
      type: 'history/fetch',
      payload: { token },
    })
  }
  handleDetail(id) {
    this.props.dispatch({
      type: 'history/detail',
      payload: id,
    });
  }
  handleSearch(data) {
    data.token = this.props.token;
    this.props.dispatch({
      type: 'history/fetch',
      payload: data,
    });
  }
  render() {
    const { history } = this.props;

    return (
      <div>
        <h2>采集图像集合</h2>
        <SearchBar
          handleSearch={this.handleSearch.bind(this)}
        />
        <ImageList
          handleDetail={this.handleDetail}
          imgs={history}
        />
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { history } = state.history;
  const { token } = state.global;
  return {
    history,
    token,
    loading: state.loading.models.history,
  };
}
export default connect(mapStateToProps)(HistoryList)
