import { Tag, Badge } from 'antd';
import getMarkCss from "../../utils/markType"
import styles from './index.less';
import Sample from "../../assets/sample.jpeg";

export default function () {
  // edge-loss, edge-crack, burr, tower-type, loose-roll, roll
  const list = [];
  for (let i = 1; i < 20; i++) {
    const types = ["edge-loss", "edge-crack", "burr", "tower-type", "loose-roll", "roll"]
    list.push({
      "markType": types[Math.floor(Math.random() * 6)],
      "markPosition": { x: Math.floor(Math.random() * 1200), y: Math.floor(Math.random() * 700) }
    });
  }
  console.log(list);
  const data = list.map((item, index) => {
    const css = getMarkCss(item.markType);
    const pos = { marginLeft: item.markPosition.x, marginTop: item.markPosition.y }
    return <div key={index} className={`mark-tag ${css}`} style={pos}></div>;
  })


  return (
    <div className={styles.normal}>

      <div className={styles.title}>
        <div className="left">
          <div className="left"><h3>实时图片 ID：20181122-2-33</h3></div>
          <div className="left real-time-title-badge">
            <Badge count={1}><Tag color="red">边损</Tag></Badge>
            <Badge count={5}><Tag color="orange">边裂</Tag></Badge>
            <Badge count={3}><Tag color="green">毛刺</Tag></Badge>
            <Badge count={2}><Tag color="cyan">塔型</Tag></Badge>
            <Badge count={0}><Tag color="blue">松卷</Tag></Badge>
            <Badge count={5}><Tag color="purple">面包卷</Tag></Badge>
          </div>
        </div>
        <div className="right">
          <span>2018-11-26 15:42:29</span>
        </div>
      </div>

      <div className={styles.detail}>
        <div className={`${styles["detail-wrap"]} left`}>
          <div>
            {data}
          </div>
          <img src={Sample} alt="" />
        </div>
      </div>
    </div>
  );
}
