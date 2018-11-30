import { connect } from 'dva';
import ImageList from './ui.image.list';
import SearchBar from './ui.search';
import styles from './index.less';

const HistoryList = ({ dispatch, imgs }) => {
  function handleDetail(id) {
    dispatch({
      type: 'history/detail',
      payload: id,
    });
  }
  return (
    <div>
      <h2>采集图像集合</h2>
      <SearchBar />
      <ImageList onDelete={handleDetail} imgs={imgs} />
    </div>
  );
};

export default connect(({ imgs }) => ({
  imgs,
}))(HistoryList);
