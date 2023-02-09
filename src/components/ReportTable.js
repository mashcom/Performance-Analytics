import axios from "axios";
import React, { Component } from "react";
import ActionReportBadge from "../components/ActionReportBadge";
import HeaderTitle from "../components/HeaderTitle";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default class ReportTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      options: {
        chart: {
          type: "column",
        },

        title: {
          text: "Olympic Games all-time medal table, grouped by continent",
        },

        xAxis: {
          categories: ["Punch", "Hook", "Movement"],
        },

        yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
            text: "Count medals",
          },
        },

        tooltip: {
          formatter: function () {
            return (
              "<b>" +
              this.x +
              "</b><br/>" +
              this.series.name +
              ": " +
              this.y +
              "<br/>" +
              "Total: " +
              this.point.stackTotal
            );
          },
        },

        plotOptions: {
          column: {
            stacking: "normal",
          },
        },

        series: [
          {
            name: "Norway",
            data: [148, 133, 78],
            stack: "Punch",
          },
          {
            name: "Germany",
            data: [102, 98, 90],
            stack: "Punch",
          },
          {
            name: "Norway",
            data: [148, 133, 200],
            stack: "Hook",
          },
          {
            name: "Germany",
            data: [102, 98, 50],
            stack: "Hook",
          },
        ],
      },
    };
  }

  render() {
    const { reports, fight, rounds } = this.state;
    return (
      <div className="container mt-3">
        <HeaderTitle title="Performance Report" />
        <div class="card">
          <div class="card-header">
            PERFORMANCE ANALYSIS
            {/* <button onClick={window.print()} class='btn btn-primary float-right'>Print</button> */}
          </div>

          <div class="card-body">
            {/* <HighchartsReact
              highcharts={Highcharts}
              options={this.state.options}
            
              
            /> */}

            {fight !== undefined && (
              <table className="table">
                <tr>
                  <td className="fw-bold text-uppercase">
                    <span className="badge bg-primary m-1">COLOUR CODE</span>
                    {fight.boxer.name}
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold text-uppercase">
                    <span className="badge bg-danger m-1">COLOUR CODE</span>
                    {fight.opponent.name}
                  </td>
                </tr>
                <tr>
                  <td className="fw-bold">{fight.description}</td>
                </tr>
              </table>
            )}

            {rounds !== undefined &&
              rounds.map((round) => {
                return (
                  <React.Fragment>
                    <h1 className="fw-bold mt-3">Rounds {round.round}</h1>
                    <table className="table table-striped table-bordered">
                      <thead className="table-dark fw-bold text-uppercase">
                        <tr>
                          <td>Action</td>
                          <td className="fw-bold">Success</td>
                          <td className="fw-bold">Partial Success</td>
                          <td className="fw-bold">Failed</td>
                          {/* <td>Total</td> */}
                        </tr>
                      </thead>
                      {reports.map((report) => {
                        return (
                          <React.Fragment key={report.id}>
                            <tbody>
                              <tr>
                                <td className="fw-bold text-uppercase bg-dark text-white">
                                  {report.name}
                                </td>
                                <td className="fw-bold">HEAD</td>
                                <td className="fw-bold">BODY</td>
                                {/* <td className="fw-bold">BOTH</td> */}
                              </tr>

                              {report.actions.map((action) => {
                                return (
                                  <tr key={action.id}>
                                    <td>{action.name}</td>
                                    <td>
                                      <span className="badge bg-primary m-1">
                                        {this.calculateOutcomeCount(
                                          action.outcomes,
                                          "success",
                                          "main",
                                          round.round,
                                          2
                                        )}
                                      </span>
                                      <span className="badge bg-danger m-1">
                                        {this.calculateOutcomeCount(
                                          action.outcomes,
                                          "success",
                                          "opponent",
                                          round.round,
                                          2
                                        )}
                                      </span>
                                    </td>

                                    <td>
                                      <span className="badge bg-primary m-1">
                                        {this.calculateOutcomeCount(
                                          action.outcomes,
                                          "partial success",
                                          "main",
                                          round.round,
                                          1
                                        )}
                                      </span>
                                      <span className="badge bg-danger m-1">
                                        {this.calculateOutcomeCount(
                                          action.outcomes,
                                          "partial success",
                                          "opponent",
                                          round.round,
                                          1
                                        )}
                                      </span>
                                    </td>
                                    <td>
                                      <span className="badge bg-primary m-1">
                                        {this.calculateOutcomeCount(
                                          action.outcomes,
                                          "failed",
                                          "main",
                                          round.round,
                                          3
                                        )}
                                      </span>
                                      <span className="badge bg-danger m-1">
                                        {this.calculateOutcomeCount(
                                          action.outcomes,
                                          "failed",
                                          "opponent",
                                          round.round,
                                          3
                                        )}
                                      </span>
                                    </td>

                                    {/* <td>
                                      <span className="badge bg-primary m-1">
                                        {this.calculateOutcomeCount(
                                          action.outcomes,
                                          undefined,
                                          "main",
                                          round.round,
                                          undefined
                                        )}
                                      </span>
                                      <span className="badge bg-danger m-1">
                                        {this.calculateOutcomeCount(
                                          action.outcomes,
                                          undefined,
                                          "opponent",
                                          round.round,
                                          undefined
                                        )}
                                      </span>
                                    </td> */}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </React.Fragment>
                        );
                      })}
                    </table>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getFightDetails();
    this.getRounds();
  }

  calculateOutcomeCount(outcomes, status, boxer, round, target) {
    const { fight } = this.state;
    boxer = boxer === "main" ? (boxer = fight.boxer1) : fight.boxer2;
    if (status === undefined) {
      let total_count = outcomes.filter(
        (outcome) =>
          outcome.boxer_id === boxer &&
          outcome.round === round &&
          outcome.target_id !== 4
      );

      var total_number = 0;
      if (total_count.length > 0) {
        console.log(total_count);
        total_count.map((counter) => {
          total_number += parseInt(counter.total);
        });
        return total_number;
      }
      return 0;
    }

    const count = outcomes.filter(
      (outcome) =>
        outcome.outcome === status &&
        outcome.boxer_id === boxer &&
        outcome.target_id === target &&
        outcome.round === round
    );
    if (count.length === 1) {
      return count[0].total;
    }
    return 0;
  }

  getReport = () => {
    const { fight_id } = this.props;
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/outcome/${fight_id}`,
    })
      .then((response) => {
        this.setState({
          reports: response.data,
        });
      })
      .catch((response) => {
        this.setState({
          reports: response.data,
        });
      });
  };

  getFightDetails = () => {
    const { fight_id } = this.props;
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/fight/${fight_id}`,
    })
      .then((response) => {
        this.getReport();
        this.setState({
          fight: response.data,
        });
      })
      .catch((response) => {
        this.setState({
          fight: response.data,
        });
      });
  };

  getRounds = () => {
    const { fight_id } = this.props;
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/round/${fight_id}`,
    })
      .then((response) => {
        this.setState({
          rounds: response.data,
        });
      })
      .catch((response) => {
        this.setState({
          rounds: response.data,
        });
      });
  };
}
