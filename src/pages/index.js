import styles from './index.css';
import router from 'umi/router';

function goToListPage() {
  router.push('/login');
  return null;
}
export default goToListPage;
