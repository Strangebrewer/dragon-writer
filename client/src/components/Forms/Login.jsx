import React from 'react';
import styled from "styled-components";
import { Button, Input, Label } from "./FormElements";
import { LinkBtn } from "../PageElements";

const Container = styled.div`
  background: rgba(38, 212, 204, 0.267);
  border: 1px solid rgb(38, 212, 204);
  border-radius: 12px;
  box-shadow: 0 0 1px #000,
    0 0 2px #000,
    0 0 4px #000,
    0 0 8px #111,
    0 0 10px #111,
    0 0 20px #222,
    0 0 40px #aaa,
    inset 0 0 100px 30px rgb(0,0,0);
  border-radius: 10px;
  padding: 20px;
  width: 300px;
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 1.5rem;
  padding-top: 10px;
  text-align: center;
`;

export const Login = props => (
  <Container>
    <Heading>Login</Heading>
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
      <Button center landing round onClick={props.login}>Submit</Button>
    </form>
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
  </Container>
);