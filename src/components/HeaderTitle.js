import React from "react";

export default class HeaderTitle extends React.Component {

  render() {
    return (
     <h1 className="fw-bolder">{this.props.title}</h1>
    );
  }
}
