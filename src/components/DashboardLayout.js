import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class DashboardLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
              <Link className="navbar-brand text-white fw-bolder" to={`/`}>
                Performance Analytics System
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active  text-white"
                      aria-current="page"
                      to={`/`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  text-white" to={`/record`}>
                      Recording Sessions
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  text-white" to={`/fight`}>
                      Create Fight
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link  text-white" to={`/boxer`}>
                      Boxers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                     className="nav-link  text-white" to={`/report`}>
                      Reports
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle  text-white"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Settings
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to={`/info`}>
                          Information
                        </Link>
                      </li>
                     
                     
                      <li>
                        <Link className="dropdown-item" to={`/target`}>
                          Targets
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
