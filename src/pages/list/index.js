import { connect } from 'dva';
import ProductList from '../../components/ProductList';
import SearchBar from './search';
import styles from './index.css';

const Products = ({ dispatch, products }) => {
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
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

export default connect(({ products }) => ({
  products,
}))(Products);