import { connect } from 'dva';
import ImageList from '../../components/ImageList';
import SearchBar from './search';
import styles from './index.less';

const Products = ({ dispatch, imgs }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>采集图像集合</h2>
      <SearchBar />
      <ImageList onDelete={handleDelete} imgs={imgs} />
    </div>
  );
};

export default connect(({ imgs }) => ({
  imgs,
}))(Products);