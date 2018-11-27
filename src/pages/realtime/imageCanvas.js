import { Image, Layer, Line, Stage } from 'react-konva';

const defaultWidth = 1920;
const defaultHeight = 1080;



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
    // 图片加载及监听
    this.state.image.src = 'https://img.zcool.cn/community/0100e655445e5b0000019ae9770313.jpg@2o.jpg';
    this.state.image.onload = () => {
      this.imageNode.getLayer().batchDraw();
    };
    this.timer = setTimeout(() => {
      // 等待Dom构建
      this.calcWidth();
    }, 100);

    // resize监听
    window.addEventListener('resize', this.handelResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handelResize);
  }

  handelResize() {
    if (this.wrapNode) {
      this.calcWidth();
    }
  }
  calcWidth(){
    const canvasWidth = this.wrapNode.parentNode.parentNode.scrollWidth;
    const canvasHeight = Math.floor(canvasWidth / defaultWidth * defaultHeight);
    this.setState({ canvasWidth, canvasHeight });
  }

  componentWillUnmount() {
    const { image } = this.state;
    if (image) {
      image.onload = () => { };
    }
    this.timer && clearTimeout(this.timer);
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
