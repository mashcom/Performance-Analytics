import React, { Component } from "react";
import { Link, redirect } from "react-router-dom";

export default class DashboardLayout extends Component {


  handleLogin = () => {
    this.setState({ user: { id: '1', name: 'robin' } });
    localStorage.setItem("user", this.state.user);
    // window.location.href = '/';

  }
  handleLogout = () => {
    this.setState({ user: null });
    localStorage.removeItem("user")
    window.location.href = '/login';

  };
  render() {
    const logged_user = localStorage.getItem("user");

    return (
      <React.Fragment>
        <div className="App">
          {logged_user && (
            <nav className="navbar navbar-expand-lg bg-dark">
              <div className="container-fluid">
                <Link className="navbar-brand text-white fw-bolder" to={`/`}>
                  Boxing  Nortation Perfomance Analysis System
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
                      <Link className="nav-link  text-white" to={`/record`}>
                        Analysis Sessions
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link  text-white" to={`/fight`}>
                        New Analysis
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link  text-white" to={`/boxer`}>
                        Boxers
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
                    <li className="nav-item">
                      <Link className="nav-link  text-white" to={`/user`}>
                        Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link  text-white" onClick={this.handleLogout}>
                        Logout
                      </Link>
                    </li>

                    
                  </ul>
                </div>
              </div>
            </nav>
          )}

          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
