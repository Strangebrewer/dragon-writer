import React, { Fragment, useState } from 'react';
import { Login, Signup } from "../Forms";
import { API } from "../../utils";

export const Authenticate = props => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [flag, setFlag] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'email': setEmail(value); break;
      case 'username': setUsername(value); break;
      case 'password': setPassword(value); break;
      case 'confirmPw': setConfirmPw(value); break;
      default: break;
    }
  };

  const toggleSignupForm = () => setFlag(!flag);

  const login = async event => {
    if (event) event.preventDefault();
    const res = await API.login({ username, password });
    const { token, user } = res.data;
    if (user)
      localStorage.setItem('token', token)
    props.getInitialData(user);
  };

  const signup = async event => {
    event.preventDefault();
    const res = await API.signup({
      username, email, password
    });
    const { token, user } = res.data;
    if (!res.data.error && user._id)
      localStorage.setItem('token', token)
    props.getInitialData(user);
  };

  return (
    <Fragment>
      {flag
        ? (
          <Signup
            confirmPw={confirmPw}
            email={email}
            getInitialData={props.getInitialData}
            handleInputChange={handleInputChange}
            password={password}
            signup={signup}
            toggleSignupForm={toggleSignupForm}
            username={username}
          />
        ) : (
          <Login
            getInitialData={props.getInitialData}
            handleInputChange={handleInputChange}
            login={login}
            password={password}
            toggleSignupForm={toggleSignupForm}
            username={username}
          />
        )
      }
    </Fragment>
  );
};