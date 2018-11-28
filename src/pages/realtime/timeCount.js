

class Component extends React.Component {
  state = {
    time: 0
  }

  componentDidMount() {
    const date = new Date();
    const time = date.getTime();
    this.setState({ time: time + 1000 });
  }

  componentDidUpdate() {
    // this.timer = setTimeout(() => {
    //   this.setState({ time: this.state.time + 1000 })
    // }, 1000);
  }

  componentWillUnmount() {
    // this.timer && clearTimeout(this.timer);
  }

  render() {
    const date = new Date();
    date.setTime(this.state.time);

    return (
      <span>{date.toLocaleString()}</span>
    );
  }
}
export default Component;
