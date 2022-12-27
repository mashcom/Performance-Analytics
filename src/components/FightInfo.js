import axios from "axios";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import HeaderTitle from "./HeaderTitle";
import LoadingSpinner from "./LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class FightInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { settings: [] };
  }

  render() {
    const { settings, boxer_details } = this.state;

    return (
      <React.Fragment>
        <div className="container mt-3">
          <ToastContainer />
          <HeaderTitle title="Fight Recorder"></HeaderTitle>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              {boxer_details !== undefined && (
                <div className="alert alert-info">
                  Blessing vs Mike Fight you are recording for{" "}
                  <span className="fw-bolder">{boxer_details.name}</span>
                </div>
              )}
              <Tabs
                defaultActiveKey="0"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                {settings.infos !== undefined ? (
                  settings.infos.map((info) => {
                    return (
                      <Tab eventKey={info.id} title={info.name}>
                        <h5 class="fw-bold text-muted float-left mx-3">
                          Action
                        </h5>
                        <div
                          class="btn-group btn-group-lg col-lg-12"
                          role="group"
                          aria-label="Large button group"
                        >
                          {info.actions.map((action) => {
                            return (
                              <React.Fragment>
                                <button
                                  key={action.id}
                                  type="button"
                                  class="btn btn-outline-dark btn-lg m-3 fw-bolder p-3"
                                  data-bs-toggle="moddal"
                                  data-bs-target="#exampleMeodal"
                                  onClick={this.setActionTaken.bind(
                                    this,
                                    action.id
                                  )}
                                >
                                  {action.name}
                                </button>
                              </React.Fragment>
                            );
                          })}
                        </div>
                        <div class="p-3">
                          <h5 class="fw-bold text-muted">Target </h5>
                          <div
                            class="btn-group btn-group-lg col-lg-12"
                            role="group"
                            aria-label="Large button group"
                          >
                            {settings.targets !== undefined ? (
                              settings.targets.map((target) => {
                                return (
                                  <button
                                    type="button"
                                    class="btn btn-outline-dark btn-lg btn-block w-100 fw-bolder p-3"
                                    onClick={this.setActionTarget.bind(
                                      this,
                                      target.id
                                    )}
                                  >
                                    {target.name}
                                  </button>
                                );
                              })
                            ) : (
                              <React.Fragment></React.Fragment>
                            )}
                          </div>

                          <h5 class="fw-bold text-muted float-left my-3">
                            Outcome
                          </h5>
                          <div
                            class="btn-group btn-group-lg col-lg-12 fw-bold"
                            role="group"
                            aria-label="Large button group"
                          >
                            <button
                              onClick={this.submitOutcome.bind(this, "success")}
                              type="button"
                              class="btn btn-success btn-lg fw-bolder p-3"
                            >
                              Success
                            </button>
                            <button
                              onClick={this.submitOutcome.bind(this, "failed")}
                              type="button"
                              class="btn btn-danger"
                            >
                              Failed
                            </button>
                            <button
                              onClick={this.submitOutcome.bind(
                                this,
                                "partial success"
                              )}
                              type="button"
                              class="btn btn-warning"
                            >
                              Partial Success
                            </button>
                            <button
                              onClick={this.submitOutcome.bind(this, "unknown")}
                              type="button"
                              class="btn btn-secondary"
                            >
                              Unknown
                            </button>
                          </div>
                        </div>
                      </Tab>
                    );
                  })
                ) : (
                  <LoadingSpinner />
                )}
              </Tabs>
            </Tab>
          </Tabs>
        </div>
      </React.Fragment>
    );
  }
  componentDidMount() {
    const { fighter_id, fight_id } = this.props;
    this.setState({
      fight_id: fight_id,
      fighter_id: fighter_id,
    });
    this.getSettings();
    this.getBoxer();
  }

  getSettings() {
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/settings`,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          settings: response.data,
        });
      })
      .catch((response) => {
        console.log(response);
        this.setState({
          settings: response.data,
        });
      });
  }
  getBoxer() {
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/boxer/${this.props.fighter_id}`,
    })
      .then((response) => {
        this.setState({
          boxer_details: response.data,
        });
      })
      .catch((response) => {
        this.setState({
          boxer_details: response.data,
        });
      });
  }
  setActionTaken(id) {
    this.setState({
      actionTaken: id,
    });
  }

  setActionTarget(id) {
    this.setState({
      actionTarget: id,
    });
  }

  submitOutcome = (outcome) => {
    this.setState({
      actionOutcome: outcome,
    });

    const { actionOutcome, actionTaken, actionTarget, fight_id, fighter_id } =
      this.state;
    axios({
      method: "post",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/outcome`,
      data: {
        action_id: actionTaken,
        target_id: actionTarget,
        boxer_id: fighter_id,
        fight_id: fight_id,
        outcome: outcome,
      },
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        console.log(response);
        toast(response.data.message);
        return response.data;
      })
      .catch(function (response) {
        console.log(response);
        return response.data;
      });
  };
}
