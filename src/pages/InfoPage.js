import axios from "axios";
import React, { Component } from "react";
import { ListGroup, Tab, Tabs } from "react-bootstrap";
import HeaderTitle from "../components/HeaderTitle";

export default class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = { fights: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleActionChange = this.handleActionChange.bind(this);
    this.handleActionSubmit = this.handleActionSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ input: event.target.value });
  };

  handleActionChange = (event) => {
    this.setState({ action: event.target.value });
  };
  handleActionSubmit = (event) => {
    const { action, active_id } = this.state;

    event.preventDefault();
    axios({
      method: "post",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/action`,
      data: {
        name: action,
        info_id: active_id,
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
  handleSubmit = (event) => {
    const { input } = this.state;

    event.preventDefault();
    axios({
      method: "post",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/info`,
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
        <HeaderTitle title="Information Settings"></HeaderTitle>
        <div className="card">
          <div className="card-header fw-bold">BASE INFORMATION</div>
          <div className="card-body">
            <div className="alert alert-info fw-bold">
              Please enter a base information below e.g Attacking
            </div>
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
                  value="SAVE NEW SETTING"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-header fw-bold">ACTION SETTINGS</div>
          <div className="card-body">
            {info !== undefined ? (
              <React.Fragment>
                <Tabs
                  defaultActiveKey={info[0].id}
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  onSelect={(k) => this.setState({ active_id: k })}
                >
                  {info.map((i) => {
                    return (
                      <Tab eventKey={i.id} title={i.name}>
                        <div className="alert alert-info fw-bold">
                          {`Please enter a ${i.name} action below e.g Punch`}
                        </div>
                        <form
                          class="row g-3 mb-5"
                          onSubmit={this.handleActionSubmit}
                        >
                          <div class="col">
                            <input
                              type="text"
                              class="form-control"
                              value={this.state.value}
                              placeholder={`Add ${i.name} action`}
                              onChange={this.handleActionChange}
                            />
                          </div>
                          <div class="col">
                            <input
                              type="submit"
                              class="btn btn-primary fw-bold text-uppercase"
                              value={`SAVE ${i.name} ACTION`}
                            />
                          </div>
                        </form>
                        <ListGroup>
                          {i.actions.map((action) => {
                            return (
                              <ListGroup.Item>{action.name}</ListGroup.Item>
                            );
                          })}
                        </ListGroup>
                      </Tab>
                    );
                  })}
                </Tabs>
              </React.Fragment>
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
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/info`,
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
