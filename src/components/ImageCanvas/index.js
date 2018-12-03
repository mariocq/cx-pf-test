import { Spin } from 'antd';
import { Circle, Image, Layer, Line, Stage } from 'react-konva';
import getMarkColor from '../../utils/markType';

class ImageCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
  }

  state = {
    image: new window.Image(),
    canvasWidth: 0,
    canvasHeight: 0,
  }

  componentDidMount() {
    // 等待Dom构建，计算初始化大小
    this.timer = setTimeout(() => {
      this.calcWidth();
    }, 100);

    // resize添加监听
    window.addEventListener('resize', this.handleResize);
  }

  componentDidUpdate() {
    const { data } = this.props;
    if (data.imgURL) {
      // 图片加载
      this.state.image.src = data.imgURL;
      this.state.image.onload = () => {
        this.imageNode.getLayer().batchDraw();
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
    const { image } = this.state;
    if (image) {
      image.onload = () => { };
    }
    this.timer && clearTimeout(this.timer);
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
    // console.log(e.evt.offsetX, e.evt.offsetY);
  }

  /**
   * 根据默认大小比例，计算显示尺寸
   */
  calcWidth() {
    // 获取数据尺寸
    const { data } = this.props;
    const { imgSizeWidth, imgSizeHeight } = data;

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

    return (
      <div ref={dom => { this.wrapNode = dom }}>
        <Spin spinning={this.props.loading}>
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
        </Spin>
      </div>
    );
  }
}
export default ImageCanvas;
