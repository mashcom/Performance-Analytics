import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import HeaderTitle from "../components/HeaderTitle";

export default class UsersPage extends Component {
    constructor(props) {
        super(props);
        this.state = { boxers: [{}] };
    }

    onSubmit = (e) => {
        //alert(user)
        e.preventDefault();
        const { username, password } = this.state;
        this.loginUser(username, password)

    }

    deleteUser = (id) => {
        axios
            .post(`http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/auth`, {
                data: { id: id },
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                toast(response.data.message);
                this.getUsers();

            })
            .catch((error) => {
                toast("Request failed");
            });
    }
    loginUser = (user, password) => {

        axios
            .post(`http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/auth`, {
                data: { user: user, password: password },
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                toast(response.data.message);
                this.getUsers();


            })
            .catch((error) => {
                toast("Request failed");
            });
    };

    onChangeUser = (e) => this.setState({ username: e.target.value });
    onChangePassword = (e) => this.setState({ password: e.target.value });
    render() {
        const { users } = this.state;
        return (
            <React.Fragment>
                <ToastContainer />

                <div className="container my-5">
                    <HeaderTitle className="" title="Users" />
                    <div class="card">
                        <div className="card-header">
                            Users
                            <Link
                                className="btn btn-primary fw-bold float-end"
                                to={`/user/create`}
                            >
                                Users              </Link>
                        </div>
                        <div class="card-body">
                            <form class="row g-3 mb-5">
                                <div class="col-md-6">
                                    <label for="inputEmail4" class="form-label">Email</label>
                                    <input type="email" class="form-control" onChange={this.onChangeUser} id="inputEmail4" />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputPassword4" class="form-label">Password</label>
                                    <input type="password" class="form-control" onChange={this.onChangePassword} id="inputPassword4" />
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary btn-lg btn-block fw-bold" onClick={this.onSubmit} >Create</button>
                                </div>
                            </form>
                            {users !== undefined && (
                                <table className="table table-borderefd table-striped">
                                    <thead className="table-dark text-uppercase fw-bold">
                                        <tr>
                                            <td>username</td>
                                            <td>created</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => {
                                            return (
                                                <tr key={user.id}>
                                                    <td>{user.username}</td>
                                                    <td>{user.created_at}</td>
                                                    {/* <td>
                                                        <button className="btn btn-danger btn-block" onClick={this.deleteUser(user.id)}>DELETE</button>
                                                        </td> */}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )

                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers() {
        axios({
            method: "get",
            url: `http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/auth`,
        })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    users: response.data,
                });
            })
            .catch((response) => {
                console.log(response);
                this.setState({
                    users: response.data,
                });
            });
    }
}
