import Konva from 'konva';
import { Stage, Layer, Image, Line } from 'react-konva';
import Sample from "../../assets/sample.jpeg";


class Component extends React.Component {
  state = {
    image: null
  }
  componentDidMount() {
    const image = new window.Image();
    // image.src = {Sample};
    image.src = "https://konvajs.github.io/assets/yoda.jpg";
    console.log(Sample);
    console.log(image);

    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image: image
      });
    };
  }

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image image={this.state.image} />
          <Line
            x={60}
            y={20}
            points={[0, 0, 100, 0, 100, 100, 50, 150, -10, 100]}
            closed
            stroke="#f5222d"
            strokeWidth="4"
          />
        </Layer>
      </Stage>
    );
  }
}
export default Component;
