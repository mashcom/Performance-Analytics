import React from "react";

class Test extends React.Component {
  constructor(props) {
    super(props);

    // We declare the state as shown below
    this.state = {
      x: "This is x from state",
      y: "This is y from state",
    };
  }

  componentDidMount() {
    this.setState({X:"NEW STATE"})
  }

  render() {
    let x1 = this.state.x;
    let y1 = this.state.y;

    return (
      <div>
        <h1>{x1}</h1>
        <h2>{y1}</h2>
      </div>
    );
  }
}
export default Test;
