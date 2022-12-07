import axios from "axios";
import React, { Component } from "react";
import HeaderTitle from "../components/HeaderTitle";

export default class CreateBoxer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDobChange = this.handleDobChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleReachChange = this.handleReachChange.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleDobChange = (event) => {
    this.setState({ dob: event.target.value });
  };
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };
  handleWeightChange = (event) => {
    this.setState({ weight: event.target.value });
  };
  handleHeightChange = (event) => {
    this.setState({ height: event.target.value });
  };
  handleReachChange = (event) => {
    this.setState({ reach: event.target.value });
  };

  handleSubmit = (event) => {
    const { name } = this.state;

    event.preventDefault();
    axios({
      method: "post",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/boxer`,
      data: this.state,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        console.log(response);
        alert(response.data.message);
        this.setState({})
        return response.data;
      })
      .catch(function (response) {
        console.log(response);
        return response.data;
      });
  };
  render() {
    return (
      <React.Fragment>
        <div className="container my-5">
          <HeaderTitle className="" title="Add New Boxer" />
          <div className="card">
            <div className="card-header">Enter Details</div>
            <div className="card-body">
              <form class="row g-3" onSubmit={this.handleSubmit}>
                <div class="col-md-6">
                  <label for="name" class="form-label">
                    Fullname
                  </label>
                  <input
                    type="name"
                    class="form-control"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </div>

                <div class="col-6">
                  <label for="dob" class="form-label">
                    DOB
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="dob"
                    placeholder=""
                    value={this.state.dob}
                    onChange={this.handleDobChange}
                  />
                </div>
                <div class="col-md-12">
                  <label for="description" class="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                  />
                </div>
                <div class="col-md-4">
                  <label for="weight" class="form-label">
                    Weight (KG)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={700}
                    class="form-control"
                    id="weight"
                    value={this.state.weight}
                    onChange={this.handleWeightChange}
                  />
                </div>
                <div class="col-md-4">
                  <label for="Height" class="form-label">
                    Height (CM)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    class="form-control"
                    id="height"
                    value={this.state.height}
                    onChange={this.handleHeightChange}
                  />
                </div>
                <div class="col-md-4">
                  <label for="Reach" class="form-label">
                    Reach (CM)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    class="form-control"
                    id="reach"
                    value={this.state.reach}
                    onChange={this.handleReachChange}
                  />
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary fw-bold text-uppercase">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
