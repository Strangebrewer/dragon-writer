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

  login = async event => {
    if (event) event.preventDefault();
    const { username, password } = this.state;
    const res = await API.login({ username, password });
    const { token, user } = res.data;
    if (user)
      localStorage.setItem('token', token)
    this.props.getInitialData(user);
  };

  signup = async event => {
    event.preventDefault();
    const { email, password, username } = this.state;
    const res = await API.signup({
      username, email, password
    });
    const { token, user } = res.data;
    if (!res.data.error && user._id)
      localStorage.setItem('token', token)
    this.props.getInitialData(user);
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