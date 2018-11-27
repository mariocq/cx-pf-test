import { Image, Layer, Line, Stage } from 'react-konva';

class ImageCanvas extends React.Component {
  state = {
    image: new window.Image()
  }
  componentDidMount() {
    this.state.image.src = 'https://img.zcool.cn/community/0100e655445e5b0000019ae9770313.jpg@2o.jpg';
    this.state.image.onload = () => {
      this.imageNode.getLayer().batchDraw();
    };
  }

  componentWillUnmount() {
    const { image } = this.state;
    if (image) {
      image.onload = () => { };
    }
  }

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image image={this.state.image} ref={node => {
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
    );
  }
}
export default ImageCanvas;
