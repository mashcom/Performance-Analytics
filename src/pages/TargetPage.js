import axios from "axios";
import React, { Component } from "react";
import HeaderTitle from "../components/HeaderTitle";

export default class TargetPage extends Component {
  constructor(props) {
    super(props);
    this.state = { fights: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };
  handleSubmit = (event) => {
    const { input } = this.state;

    event.preventDefault();
    axios({
      method: "post",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/target`,
      data: {
        name: input,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        console.log(response);
        alert(response.data.message);
        this.getInfo();
        return response.data;
      })
      .catch(function (response) {
        console.log(response);
        return response.data;
      });
  };

  render() {
    const { info } = this.state;

    return (
      <div className="container mt-3">
        <HeaderTitle title="Target Settings"></HeaderTitle>
        <div className="card">
          <div className="card-header">TARGET</div>
          <div className="card-body">
            <form class="row g-3 mb-5" onSubmit={this.handleSubmit}>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
              <div class="col">
                <input
                  type="submit"
                  class="btn btn-primary fw-bold"
                  value="SAVE NEW TARGET"
                />
              </div>
            </form>
            <hr />
            {info !== undefined ? (
              <table className="table table-striped table-bordered">
                <tbody>
                  {info.map((i) => {
                    return (
                      <tr>
                        <td>{i.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/target`,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          info: response.data,
        });
      })
      .catch((response) => {
        console.log(response);
        this.setState({
          info: response.data,
        });
      });
  }
}
