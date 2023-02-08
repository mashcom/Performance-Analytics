import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderTitle from "../components/HeaderTitle";

export default class BoxersPage extends Component {
  constructor(props) {
    super(props);
    this.state = { boxers: [{}] };
  }
  render() {
    const { boxers } = this.state;
    return (
      <React.Fragment>
        <div className="container my-5">
          <HeaderTitle className="" title="Boxers" />
          <div class="card">
            <div className="card-header">
              Boxers List
              <Link
                className="btn btn-primary fw-bold float-end"
                to={`/boxer/create`}
              >
                Add Boxer
              </Link>
            </div>
            <div class="card-body">
              <table className="table table-borderefd table-striped">
                <thead className="table-dark text-uppercase fw-bold">
                  <tr>
                    <td>Name</td>
                    <td>Description</td>
                    <td>DOB</td>
                    <td>Weight(kg)</td>
                    <td>Height(cm)</td>
                    <td>Category</td>
                  </tr>
                </thead>
                <tbody>
                  {boxers.map((boxer) => {
                    return (
                      <tr>
                        <td>{boxer.name}</td>
                        <td>{boxer.description}</td>
                        <td>{boxer.dob}</td>
                        <td>{boxer.weight}</td>
                        <td>{boxer.height}</td>
                        <td>{boxer.reach}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.getBoxers();
  }

  getBoxers() {
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/boxer`,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          boxers: response.data,
        });
      })
      .catch((response) => {
        console.log(response);
        this.setState({
          boxers: response.data,
        });
      });
  }
}
