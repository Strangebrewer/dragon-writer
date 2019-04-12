import React, { Fragment } from 'react';
import styled from "styled-components";
import { Button, Form, Input, Label } from "./FormElements";
import { LinkBtn } from "../PageElements";

let Paragraph = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  text-align: center;
`;

export const Login = props => (
  <Fragment>
    <Form style={{ paddingBottom: "10px" }}>
      <h2>Login</h2>
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
      <Paragraph>Don't have an account?
      <LinkBtn
          size="1.5rem"
          shadow
          text
          onClick={props.toggleSignupForm}
        >
          Create one.
      </LinkBtn>
      </Paragraph>
    </Form>
  </Fragment>
);