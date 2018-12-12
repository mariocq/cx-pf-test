import { Circle, Image, Layer, Line, Stage } from 'react-konva';
import getMarkColor from '../../utils/markType';

class ImageCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  state = {
    image: new window.Image(), // 显示图
    imageOver: new window.Image(),  // 放大图
    canvasWidth: 0, // 显示图宽度
    canvasHeight: 0,  // 显示图高度
    isCalced: false, // 是否计算完成
  }

  componentWillMount() {
    // 等待Dom构建，计算初始化大小
    this.timer = setInterval(() => {
      this.calcWidth();
    }, 100);

    // resize添加监听
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    const { data } = this.props;
    if (data.imgURL) {
      // 显示图加载
      this.state.image.src = data.imgURL;
      this.state.image.onload = () => {
        this.imageNode.getLayer().batchDraw();
      };
      // 放大图加载
      this.state.imageOver.src = data.imgURL;
      this.state.imageOver.onload = () => {
        this.imageOverNode.getLayer().batchDraw();
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resizeHash && nextProps.resizeHash !== this.props.resizeHash) {
      this.handleResize();
    }
  }

  componentWillUnmount() {
    // delete监听
    window.removeEventListener('resize', this.handleResize);

    // 清除Canvas异步事件
    const { image, imageOver } = this.state;
    if (image) {
      image.onload = () => { };
    }
    if (imageOver) {
      imageOver.onload = () => { };
    }

    // 确保timer删除
    if (this.timer) {
      this.timer = clearInterval(this.timer);
    }
  }

  /**
   * 监听dom resize事件
   */
  handleResize() {
    if (this.wrapNode) {
      this.calcWidth();
    }
  }

  /**
   * 监听dom MouseMove事件
   */
  handleMouseMove(e) {
    const { canvasHeight, canvasWidth } = this.state;

    // 容器垂直滚动距离
    const wrap = document.getElementsByClassName("ant-layout") || [];
    const scrollTop = wrap.length > 1 ? wrap[1].scrollTop : 0;

    // Over图层位置
    const rightBlank = canvasWidth - e.evt.offsetX;
    const bottomBlank = canvasHeight - e.evt.offsetY;
    let marginTop;
    let marginLeft;
    if (rightBlank < 250) {
      // 放大图居左，距离右边距不够
      marginLeft = e.evt.offsetX - 250;
    } else {
      // 放大图居右，正常情况
      marginLeft = e.evt.offsetX + 50;
    }
    if (bottomBlank < 200) {
      // 放大图居上，距离底边距不够
      marginTop = -canvasHeight + e.evt.offsetY - scrollTop - 200;
    } else {
      // 放大图居下，正常情况
      marginTop = -canvasHeight + e.evt.offsetY - scrollTop;
    }


    // 内含图片位置
    const marginTopImg = -e.evt.offsetY * 2 + 100;
    const marginLeftImg = -e.evt.offsetX * 2 + 100;
    this.setState({ marginTop, marginLeft, marginTopImg, marginLeftImg })

  }

  /**
   * 根据默认大小比例，计算显示尺寸
   */
  calcWidth() {

    // 获取数据尺寸
    const { data } = this.props;
    const { imgSizeWidth, imgSizeHeight } = data;

    // 如果已经没有数据，或者已经计算过，则退出
    if (!imgSizeWidth || this.state.isCalced) {
      return;
    }

    // 清除定时器
    this.timer = clearInterval(this.timer);
    this.setState({ isCalced: true });

    // 计算显示尺寸
    const canvasWidth = this.wrapNode.parentNode.parentNode.scrollWidth;
    const canvasHeight = Math.floor(canvasWidth / imgSizeWidth * imgSizeHeight);
    this.setState({ canvasWidth, canvasHeight });
  }

  /**
   * 根据默认比例，计算显示坐标
   */
  calcDisplay(arr) {
    const { canvasWidth, canvasHeight } = this.state;
    const { data } = this.props;
    const { imgSizeWidth, imgSizeHeight } = data;

    const positionArr = arr.map((item, index) => {
      if (index % 2) {
        return Math.floor(canvasHeight * item / imgSizeHeight);
      } else {
        return Math.floor(canvasWidth * item / imgSizeWidth);
      }
    })
    return positionArr;
  }

  render() {
    const { canvasWidth, canvasHeight } = this.state;
    const { marginLeft, marginTop, marginTopImg, marginLeftImg } = this.state;
    const { data } = this.props;
    const marks = data.markDetail || [];

    // line rect
    const lines = marks.filter(item => item.markPosition.length > 2);
    const displayLines = lines.map((item, index) => {
      const position = this.calcDisplay(item.markPosition);
      return (
        <Line
          key={index}
          x={0}
          y={0}
          points={position}
          closed
          stroke={getMarkColor(item.markType)}
          strokeWidth={4}
          onMouseMove={this.handleMouseMove}
        />)
    })
    const displayOverLines = lines.map((item, index) => {
      const position = this.calcDisplay(item.markPosition);
      const positionOver = position.map(item => item * 2);
      return (
        <Line
          key={index}
          x={0}
          y={0}
          points={positionOver}
          closed
          stroke={getMarkColor(item.markType)}
          strokeWidth={4}
          onMouseMove={this.handleMouseMove}
        />)
    })

    // point
    const points = marks.filter(item => item.markPosition.length === 2);
    const displayPoints = points.map((item, index) => {
      const position = this.calcDisplay(item.markPosition);
      return (
        <Circle
          key={index}
          x={position[0]}
          y={position[1]}
          radius={4}
          fill={getMarkColor(item.markType)}
          onMouseMove={this.handleMouseMove}
        />
      )
    })
    const displayOverPoints = points.map((item, index) => {
      const position = this.calcDisplay(item.markPosition);
      const positionOver = position.map(item => item * 2);
      return (
        <Circle
          key={index}
          x={positionOver[0]}
          y={positionOver[1]}
          radius={4}
          fill={getMarkColor(item.markType)}
          onMouseMove={this.handleMouseMove}
        />
      )
    })

    return (
      <div ref={dom => { this.wrapNode = dom }}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <Layer>
            <Image
              image={this.state.image}
              width={canvasWidth}
              height={canvasHeight}
              onMouseMove={this.handleMouseMove}
              ref={node => {
                this.imageNode = node;
              }} />
            {displayLines}
            {displayPoints}
          </Layer>
        </Stage>

        <div
          ref={dom => { this.overNode = dom }}
          style={{ position: "absolute", width: 200, height: 200, overflow: "hidden", marginTop: marginTop, marginLeft: marginLeft }}
        >
          <Stage style={{ width: canvasWidth * 2, height: canvasHeight * 2, marginTop: marginTopImg, marginLeft: marginLeftImg }} width={canvasWidth * 2} height={canvasHeight * 2}>
            <Layer>
              <Image
                image={this.state.imageOver}
                width={canvasWidth * 2}
                height={canvasHeight * 2}
                ref={node => {
                  this.imageOverNode = node;
                }} />
              {displayOverLines}
              {displayOverPoints}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}
export default ImageCanvas;
