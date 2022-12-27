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
            data: [148, 133,78],
            stack: "Punch",
          },
          {
            name: "Germany",
            data: [102, 98,90],
            stack: "Punch",
          },
          {
            name: "Norway",
            data: [148, 133,200],
            stack: "Hook",
          },
          {
            name: "Germany",
            data: [102, 98,50],
            stack: "Hook",
          },
        ],
      },
    };
  }

  render() {
    const { reports, fight } = this.state;
    return (
      <div className="container mt-3">
        <HeaderTitle title="Performance Report" />
        <div class="card">
          <div class="card-header">PERFORMANCE ANALYSIS</div>

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
            <table className="table table-striped table-bordered">
              <thead className="table-dark fw-bold text-uppercase">
                <tr>
                  <td>Action</td>
                  <td>Success</td>
                  <td>Partial Success</td>
                  <td>Failed</td>
                  <td>Unknown</td>
                  <td>Total</td>
                  {/* <td>Target</td>
                  <td>Fighter</td> */}
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
                      </tr>

                      {report.actions.map((action) => {
                        return (
                          <tr key={action.id}>
                            <td>{action.name}</td>
                            <td>
                              {/* <ActionReportBadge outcomes={action.outcomes} status="success" boxer="main" fight={this.state.fight}/> */}
                              <span className="badge bg-primary m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  "success",
                                  "main"
                                )}
                              </span>
                              <span className="badge bg-danger m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  "success",
                                  "opponent"
                                )}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-primary m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  "partial success",
                                  "main"
                                )}
                              </span>
                              <span className="badge bg-danger m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  "partial success",
                                  "opponent"
                                )}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-primary m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  "failed",
                                  "main"
                                )}
                              </span>
                              <span className="badge bg-danger m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  "failed",
                                  "opponent"
                                )}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-primary m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  "unknown",
                                  "main"
                                )}
                              </span>
                              <span className="badge bg-danger m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  "unknown",
                                  "opponent"
                                )}
                              </span>
                            </td>
                            <td>
                               <span className="badge bg-primary m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  undefined,
                                  "main"
                                )}
                              </span>
                              <span className="badge bg-danger m-1">
                                {this.calculateOutcomeCount(
                                  action.outcomes,
                                  undefined,
                                  "opponent"
                                )}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </React.Fragment>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
   
    this.getFightDetails();
  }

  calculateOutcomeCount(outcomes, status, boxer) {
    const { fight } = this.state;
    boxer = boxer === "main" ? (boxer = fight.boxer1) : fight.boxer2;
    if(status===undefined){
      return outcomes.filter(
        (outcome) =>  outcome.boxer_id === boxer
      ).length;
    }
    const count = outcomes.filter(
      (outcome) => outcome.outcome === status && outcome.boxer_id === boxer
    ).length;
    return `${count}`;
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
}
