import axios from "axios";
import React from "react";
import { Link, redirect } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";

export default class FightRecords extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fights: [] };
  }

  render() {
    const { fights } = this.state;

    return (
      <React.Fragment>
        <div className="container mx-auto mt-5">
          <HeaderTitle title="Join Fight Recording"></HeaderTitle>
          <div className="card">
            <div className="card-header fw-bold">
              Available Recording Sessions
            </div>
            <div className="card-body">
              <div className="alert alert-info fw-bold">
                Please select the fighter you want to record performance!
              </div>

              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Fight ID</th>
                    <th scope="col">Main</th>
                    <th scope="col">Opponent</th>
                    <th scope="col">Create At</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {fights.map((fight) => {
                    return (
                      <tr>
                        <th scope="row">{fight.id}</th>
                        <td>{fight.boxer.name}</td>
                        <td>{fight.opponent.name}</td>
                        <td>{fight.created_at}</td>
                        <td className="w-25">
                          <Link
                            className="btn btn-primary w-100 mb-2 btn-block fw-bold"
                            to={`/record/${fight.id}/${fight.boxer1}`}
                            key={fight.id}
                          >
                            Record for {fight.boxer.name}
                          </Link>
                          <Link
                            className="btn btn-success w-100 mb-2 btn-block fw-bold"
                            to={`/record/${fight.id}/${fight.boxer2}`}
                            key={fight.id}
                          >
                            Record for {fight.opponent.name}
                          </Link>
                        </td>
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
    this.getRecordings();
  }

  getRecordings() {
    axios({
      method: "get",
      url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/fight`,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          fights: response.data,
        });
      })
      .catch((response) => {
        console.log(response);
        this.setState({
          fighst: response.data,
        });
      });
  }
}
