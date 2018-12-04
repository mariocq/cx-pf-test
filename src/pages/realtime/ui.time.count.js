import moment from 'moment';
import Config from '../../utils/config';

class Component extends React.Component {
  state = {
    time: 0, // 当前显示时间
    count: 0, // 倒计时次数
  }

  componentDidMount() {
    const date = new Date();
    const time = date.getTime();
    this.setState({ time: time + 1000 });

    // 初始化Timer
    this.timer = setInterval(() => {
      // 每秒刷新
      this.setState({ time: this.state.time + 1000 })

      // 循环重置
      let { count } = this.state;
      if (count === Config.INTERVAL_TIME - 1) {
        count = 0;
        // 触发重新加载
        this.props.updateRealtimeData();
      } else {
        count++;
      }
      this.setState({ count })

    }, 1000);
  }

  componentWillUnmount() {
    // 清理定时器
    this.timer = clearTimeout(this.timer);
  }


  render() {
    const { count, time } = this.state;
    // 计时器时间
    const date = new Date();
    date.setTime(time);

    // 时间显示格式
    const now = moment(date).format("YYYY-MM-DD HH:mm:ss");

    return (
      <span>
        {Config.INTERVAL_TIME - count}秒后刷新
        <span className="text-gray"> {now}</span>
      </span>
    );
  }
}
export default Component;
