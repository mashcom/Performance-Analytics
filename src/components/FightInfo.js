import axios from "axios";
import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import HeaderTitle from "./HeaderTitle";
import LoadingSpinner from "./LoadingSpinner";

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
                defaultActiveKey='0'
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                {settings.infos !== undefined ? (
                  
                  settings.infos.map((info) => {
                    return (
                      <Tab eventKey={info.id} title={info.name}>
                        {info.actions.map((action) => {
                          return (
                            <button
                              key={action.id}
                              type="button"
                              class="btn btn-outline-dark btn-lg m-3 fw-bolder p-5"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={this.setActionTaken.bind(
                                this,
                                action.id
                              )}
                            >
                              {action.name}
                            </button>
                          );
                        })}
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

        {/* <!--ACTION OUTCOME --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title fw-bold" id="exampleModalLabel">
                  Outcome
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <h5 class="fw-bold text-muted">Target </h5>
                <div
                  class="btn-group btn-group-lg"
                  role="group"
                  aria-label="Large button group"
                >
                  {settings.targets !== undefined ? (
                    settings.targets.map((target) => {
                      return (
                        <button
                          type="button"
                          class="btn btn-outline-dark"
                          onClick={this.setActionTarget.bind(this, target.id)}
                        >
                          {target.name}
                        </button>
                      );
                    })
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </div>

                <h5 class="fw-bold text-muted float-left my-3">Outcome</h5>
                <div
                  class="btn-group btn-group-md col-lg-12"
                  role="group"
                  aria-label="Large button group"
                >
                  <button
                    onClick={this.submitOutcome.bind(this, "success")}
                    type="button"
                    class="btn btn-success"
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
                    onClick={this.submitOutcome.bind(this, "partial success")}
                    type="button"
                    class="btn btn-warning"
                  >
                    Partial Success
                  </button>
                  <button
                    onClick={this.submitOutcome.bind(this, "unknown")}
                    type="button"
                    class="btn btn-default"
                  >
                    Unknown
                  </button>
                </div>
              </div>
            </div>
          </div>
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

  submitOutcome(outcome) {
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
        alert(response.data.message);
        return response.data;
      })
      .catch(function (response) {
        console.log(response);
        return response.data;
      });
  }
}
