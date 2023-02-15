import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import ReportTable from "../components/ReportTable";
import { ToastContainer, toast } from "react-toastify";

//import "../css/login.css"

const LoginPage = () => {
  const [user, setUser] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const onChangeUser = (e) => setUser(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);

  const onSubmit = (e) => {
    //alert(user)
    e.preventDefault();

    loginUser(user, password)

  }
  const loginUser = (user, password) => {

    axios
      .post(`http://127.0.0.1:9000/http://127.0.0.1:3333/api/v1/login`, {
        data: { user: user, password: password },
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast(response.data.message);
        setAuthSession({
          ...response.data, user: user, channel: "myMSU Web Client", created: new Date(),
        });
        window.location.href = '/';

      })
      .catch((error) => {
        toast("Login failed");
      });
  };

  const setAuthSession = (payload) => {
    try {
      localStorage.setItem("user", JSON.stringify(payload));
      return true;
    } catch (error) {
      return false;
    }
  };
  return (
    <React.Fragment>
      <ToastContainer />

      <main class="form-signin col-lg-3 mx-auto text-center my-5">
        <form>
          <img class="mb-4" src="/logo.jpg" alt="" width="150" height="auto" />
          <h1 class="h3 mb-3 fw-bold">Boxing  Nortation Perfomance Analysis System</h1>

          <div class="form-floating">
            <input type="username" onChange={onChangeUser} class="form-control" id="username" name="username" placeholder="username" />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" onChange={onChangePassword} class="form-control" nname="password" id="password" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>

          <div class="checkbox mb-3">

          </div>
          <button class="w-100 btn btn-lg btn-primary" onClick={onSubmit} type="submit">Sign in</button>

        </form>
      </main>

    </React.Fragment>
  );
};
export default LoginPage;
