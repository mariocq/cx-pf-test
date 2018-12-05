import { Badge, Button, Tag } from 'antd';
import { connect } from 'dva';
import ImageCanvas from "../../components/ImageCanvas";
import router from 'umi/router';
import styles from './index.less';

class Detail extends React.Component {

  componentDidMount() {
    const { id } = this.props.location.query;
    const { token } = this.props;

    if (id && token) {
      // 获取详情
      this.props.dispatch({
        type: 'history/detail',
        payload: { token, imgID: id }
      });
    }
    else {
      router.go(-2);
    }
  }

  componentWillUnmount() {
    // 清除当前detail数据
    this.props.dispatch({
      type: 'history/detailClear'
    });
  }

  getBadgeCount(type) {
    if (type) {
      const { detail } = this.props;
      const marks = detail.markDetail || [];
      const count = marks.filter(item => item.markType === type);
      return count.length;
    }
  }

  render() {
    // 获取图片数据
    const { detail, loading, resizeHash } = this.props;
    return (
      <div className={styles.normal}>
        <div>
          <div className="left">
            <div className="left"><h3>{this.props.location.query.id}</h3></div>
            <div className="left real-time-title-badge">
              <Badge count={this.getBadgeCount("edge-loss")}><Tag color="red">边损</Tag></Badge>
              <Badge count={this.getBadgeCount("edge-crack")}><Tag color="orange">边裂</Tag></Badge>
              <Badge count={this.getBadgeCount("burr")}><Tag color="green">毛刺</Tag></Badge>
              <Badge count={this.getBadgeCount("tower-type")}><Tag color="cyan">塔型</Tag></Badge>
              <Badge count={this.getBadgeCount("loose-roll")}><Tag color="blue">松卷</Tag></Badge>
              <Badge count={this.getBadgeCount("roll")}><Tag color="purple">面包卷</Tag></Badge>
            </div>
          </div>
          <div className="right">
            <Button onClick={() => router.goBack()}>返回</Button>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={`${styles["detail-wrap"]}`}>
            <ImageCanvas
              data={detail}
              resizeHash={resizeHash}
              loading={loading}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { detail } = state.history;
  const { resizeHash } = state.images;
  const { token } = state.global;
  return {
    detail,
    token,
    resizeHash,
    loading: state.loading.models.history,
  };
}
export default connect(mapStateToProps)(Detail)
