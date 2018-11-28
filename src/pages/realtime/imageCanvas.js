import { Image, Layer, Line, Stage } from 'react-konva';
import Config from '../../utils/config';

class ImageCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.handelResize = this.handelResize.bind(this);
  }

  state = {
    image: new window.Image(),
    canvasWidth: 0,
    canvasHeight: 0,
  }

  componentDidMount() {
    const { data } = this.props;
    if (data.imgURL) {
      // 图片加载
      this.state.image.src = data.imgURL;
      this.state.image.onload = () => {
        this.imageNode.getLayer().batchDraw();
      };
    }
    // 等待Dom构建，计算初始化大小
    this.timer = setTimeout(() => {
      this.calcWidth();
    }, 100);

    // resize添加监听
    window.addEventListener('resize', this.handelResize);
  }

  componentWillUnmount() {
    // delete监听
    window.removeEventListener('resize', this.handelResize);

    // 清除Canvas异步事件
    const { image } = this.state;
    if (image) {
      image.onload = () => { };
    }
    this.timer && clearTimeout(this.timer);
  }

  handelResize() {
    if (this.wrapNode) {
      this.calcWidth();
    }
  }

  /**
   * 根据默认大小比例，计算显示尺寸
   */
  calcWidth() {
    const { SystemConst } = Config;

    const canvasWidth = this.wrapNode.parentNode.parentNode.scrollWidth;
    const canvasHeight = Math.floor(canvasWidth / SystemConst.IMG_DEFAULT_WIDTH * SystemConst.IMG_DEFAULT_HEIGHT);
    this.setState({ canvasWidth, canvasHeight });
  }

  render() {
    const { canvasWidth, canvasHeight } = this.state;

    return (
      <div ref={dom => { this.wrapNode = dom }}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <Layer>
            <Image
              image={this.state.image}
              width={canvasWidth}
              height={canvasHeight}
              ref={node => {
                this.imageNode = node;
              }} />
            <Line
              x={60}
              y={20}
              points={[0, 0, 100, 0, 100, 100, 50, 150, -10, 100]}
              closed
              stroke="#f5222d"
              strokeWidth={4}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}
export default ImageCanvas;
