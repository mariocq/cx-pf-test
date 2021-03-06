import { Tag, Badge, Spin } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import TimeCount from "./ui.time.count";
import ImageCanvas from "../../components/ImageCanvas";

class Component extends React.Component {

  constructor(props) {
    super(props);
    this.updateRealtimeData = this.updateRealtimeData.bind(this);
  }

  componentDidMount() {
    this.updateRealtimeData();
  }

  /**
   * 更新realtime数据
   */
  updateRealtimeData(){
    const { token } = this.props;
    // 获取实时数据
    this.props.dispatch({
      type: 'images/realtime',
      payload: { token },
    })
  }

  componentWillUnmount() {
    // 清除当前realtime数据
    this.props.dispatch({
      type: 'images/realtimeClear'
    });
  }

  getBadgeCount(type) {
    if (type) {
      const { realtimeData } = this.props;
      const marks = realtimeData.markDetail || [];
      const count = marks.filter(item => item.markType === type);
      return count.length;
    }
  }

  render() {
    // 获取实时图片数据
    const { realtimeData, loading, resizeHash } = this.props;

    return (
      <div className={styles.normal}>

        <div className={styles.title}>
          <div className="left">
            <div className="left"><h3><TimeCount updateRealtimeData={this.updateRealtimeData} /></h3></div>
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
            <h3>实时图片 ID：{this.props.realtimeData.imgID}</h3>
          </div>
        </div>

        <div className={styles.detail}>
          <div className={`${styles["detail-wrap"]}`}>
            {loading ?
              <Spin spinning={true}>
                <div style={{height:200}}></div>
              </Spin> :
              <ImageCanvas
                data={realtimeData}
                resizeHash={resizeHash}
                loading={loading}
              />
            }
          </div>
        </div>
      </div>
    );

  }
}
function mapStateToProps(state) {
  const { realtimeData, resizeHash } = state.images;
  const { token } = state.global;
  return {
    realtimeData,
    resizeHash,
    token,
    loading: state.loading.models.images,
  };
}
export default connect(mapStateToProps)(Component)
