import styles from './index.css';

function BasicLayout(props) {
  if (props.location.pathname === '/login') {
    return <div>{ props.children }</div>
  }
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to chuangxin!</h1>
      { props.children }
    </div>
  );
}

export default BasicLayout;
