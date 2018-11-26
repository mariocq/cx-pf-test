

class Component extends React.Component {
  state = {
    time: 1,
  }
  componentDidMount(){
    const date = new Date();
    const time = date.getTime();
    this.setState({time: time + 1000});
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.setState({time: this.state.time + 1000})
    }, 1000);
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
