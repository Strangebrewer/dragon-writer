import React from 'react';
import styled from "styled-components";
import { Button, Form, Input, Label } from "./FormElements";
import { LinkBtn } from "../PageElements";

export const Login = props => (
  <Form>
    <h2>Login</h2>
    <form>
      <Label>Username</Label>
      <Input
        name="username"
        value={props.username}
        type="text"
        onChange={props.handleInputChange}
      />
      <Label>Password</Label>
      <Input
        name="password"
        value={props.password}
        type="password"
        onChange={props.handleInputChange}
      />
      <Button center onClick={props.login}>Submit</Button>
    </form>
    <p>Don't have an account?
      <LinkBtn
        size="1.5rem"
        shadow
        text
        onClick={props.toggleSignupForm}
      >
        Create one.
      </LinkBtn>
    </p>
  </Form>
);