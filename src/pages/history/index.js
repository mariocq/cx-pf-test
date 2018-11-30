import { connect } from 'dva';
import ImageList from './ui.image.list';
import SearchBar from './ui.search';
import styles from './index.less';

class HistoryList extends React.Component {
  componentDidMount() {
    const { token } = this.props;
    // 获取历史数据
    this.props.dispatch({
      type: 'history/fetch',
      payload: { token },
    })
  }
  handleDetail(id) {
    const { token } = this.props;
    // 获取详情
    this.props.dispatch({
      type: 'history/detail',
      payload: { token , imgID: id}
    });
  }
  handleSearch(data) {
    data.token = this.props.token;
    // 筛选历史数据
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
          handleDetail={this.handleDetail.bind(this)}
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
