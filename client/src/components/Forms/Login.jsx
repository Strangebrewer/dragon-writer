import React from 'react';
import styled from "styled-components";
import { Button, Input, Label } from "./FormElements";
import { LinkBtn } from "../PageElements";

const Container = styled.div`
  width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid ${props => props.theme.linkHover};
  border-radius: 10px;
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  font-weight: bold;
`;

const Paragraph = styled.p`
  text-align: center;
  padding-top: 10px;
`;

export const Login = props => (
  <Container>
    <Heading>Login</Heading>
    <Label style={{ fontWeight: "normal" }}>Username</Label>
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
    <Button center round onClick={props.login}>Submit</Button>
    <Paragraph>Don't have an account?
      <LinkBtn
        size="1.5rem"
        bold
        onClick={props.toggleSignupForm}
      >
        Create one.
      </LinkBtn>
    </Paragraph>
  </Container>
);