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
        this.setState({});
        alert("Boxer added successfully");
        return response.data;
      })
      .catch(function (response) {
        console.log(response.response.status);
        alert("Make sure you have filled the fields!");
        return response.data;
      });
  };

  getClasses() {
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/classes`,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          classes: response.data,
        });
      })
      .catch((response) => {
        console.log(response);
        this.setState({
          classes: response.data,
        });
      });
  }
  componentDidMount() {
    this.getClasses();
  }
  render() {
    const { classes } = this.state;
    return (
      <React.Fragment>
        <div className="container my-5">
          <HeaderTitle className="" title="Add New Boxer" />
          <div className="card">
            <div className="card-header">Enter Details</div>
            <div className="card-body">
              <form className="row g-3" onSubmit={this.handleSubmit}>
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Fullname
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleNameChange}
                  />
                </div>

                <div className="col-6">
                  <label htmlFor="dob" className="form-label">
                    DOB
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    placeholder=""
                    value={this.state.dob}
                    onChange={this.handleDobChange}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="weight" className="form-label">
                    Weight (KG)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={700}
                    className="form-control"
                    id="weight"
                    value={this.state.weight}
                    onChange={this.handleWeightChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="Height" className="form-label">
                    Height (CM)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={500}
                    className="form-control"
                    id="height"
                    value={this.state.height}
                    onChange={this.handleHeightChange}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="Reach" className="form-label">
                    Category
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={""}
                    onChange={this.handleReachChange}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {classes !== undefined &&
                      classes.map((boxer) => {
                        return (
                          <option
                            className="text-uppercase"
                            key={boxer.name}
                            value={boxer.name}
                          >
                            {boxer.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary fw-bold text-uppercase"
                  >
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
