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

export const Signup = props => (
  <Container>
    <Heading>Signup</Heading>
    <Label style={{ fontWeight: "normal" }}>Username</Label>
    <Input
      name="username"
      value={props.username}
      type="text"
      onChange={props.handleInputChange}
    />
    <Label>Email</Label>
    <Input
      name="email"
      value={props.email}
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
    <Label>Confirm Password</Label>
    <Input
      name="confirmPassword"
      value={props.confirmPassword}
      type="password"
      onChange={props.handleInputChange}
    />
    <Button round center onClick={props.signup}>Submit</Button>
    <Paragraph>Already have an account?
      <LinkBtn
        size="1.5rem"
        bold
        onClick={props.toggleSignupForm}
      >
        Log in.
      </LinkBtn>
    </Paragraph>
  </Container>
);