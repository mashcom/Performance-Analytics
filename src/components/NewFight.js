import axios from "axios";
import React from "react";
import { redirect } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";

export default class NewFight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { boxers: [] };

    this.handleChange = this.handleFighterOneChange.bind(this);
    this.handleChange = this.handleFighterTwoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFighterOneChange = (event) => {
    console.log(event.target.value);
    this.setState({ fighterOne: event.target.value });
  };

  handleFighterTwoChange = (event) => {
    console.log(event.target.value);
    this.setState({ fighterTwo: event.target.value });
  };
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };
  handleSubmit = (event) => {
    const { fighterOne, fighterTwo,description } = this.state;

    event.preventDefault();

    axios({
      method: "post",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/fight`,
      data: {
        boxer1: fighterOne,
        boxer2: fighterTwo,
        description:description
      },
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        console.log(response);
        alert(response.data.message);
        window.location.href = `/record`;
        return response.data;
      })
      .catch(function (response) {
        console.log(response);
        return response.data;
      });
  };

  render() {
    const { boxers } = this.state;

    return (
      <React.Fragment>
        <div className="col-lg-6 mx-auto mt-5">
          <HeaderTitle title="Analyse New Bout"></HeaderTitle>
          <div className="card">
            <div className="card-header fw-bold">Analyse New Bout</div>
            <div className="card-body">
              <div className="alert alert-info fw-bold">
                Please select the boxers you want to record perfomance for!
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Fighter 1</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={""}
                    onChange={this.handleFighterOneChange}
                  >
                    <option value="" disabled>
                      Select Fighter
                    </option>
                    {boxers.map((boxer) => {
                      return (
                        <option
                          key={boxer.id}
                          className="text-uppercase"
                          value={boxer.id}
                        >
                          {boxer.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Fighter 2</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={""}
                    onChange={this.handleFighterTwoChange}
                  >
                    <option value="" disabled>
                      Select Fighter
                    </option>
                    {boxers.map((boxer) => {
                      return (
                        <option
                          key={boxer.id}
                          className="text-uppercase"
                          value={boxer.id}
                        >
                          {boxer.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="my-3">
                  <label for="description" class="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="description"
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                    placeholder="Short description of the fight"
                  />
                </div>

                <button type="submit" className="btn btn-primary fw-bold">
                  START SESSION
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    this.getSettings();
  }

  getSettings() {
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
