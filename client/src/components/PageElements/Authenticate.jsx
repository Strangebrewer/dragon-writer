import React, { Component, Fragment } from 'react';
import { Login, Signup } from "../Forms";
import { API } from "../../utils";

export class Authenticate extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    signup: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  toggleSignupForm = () => {
    this.setState({ signup: !this.state.signup });
  };

  login = async () => {
    const { username, password } = this.state;
    const user = await API.login({ username, password });
    if (user)
      this.props.getInitialData(user.data);
  };

  signup = async () => {
    const { email, password, username } = this.state;
    const user = await API.signup({
      username, email, password
    });
    if (!user.data.error && user.data._id) this.login();
  };

  render() {
    return (
      <Fragment>
        {this.state.signup
          ? (
            <Signup
              confirmPassword={this.state.confirmPassword}
              email={this.state.email}
              getInitialData={this.props.getInitialData}
              handleInputChange={this.handleInputChange}
              password={this.state.password}
              signup={this.signup}
              toggleSignupForm={this.toggleSignupForm}
              username={this.state.username}
            />
          ) : (
            <Login
              getInitialData={this.props.getInitialData}
              handleInputChange={this.handleInputChange}
              login={this.login}
              password={this.state.password}
              toggleSignupForm={this.toggleSignupForm}
              username={this.state.username}
            />
          )
        }

      </Fragment>
    );
  }
};