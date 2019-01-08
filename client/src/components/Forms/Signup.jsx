import React from 'react';
import styled from "styled-components";
import { Button, Input, Label } from "./FormElements";
import { LinkBtn } from "../PageElements";

const Container = styled.div`
  background-color: #ffffff5e;
  border-radius: 10px;
  margin: auto;
  padding: 20px;
  width: 300px;
  /* margin-left: 25%; */
`;

const Heading = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
`;

const Paragraph = styled.p`
  padding-top: 10px;
  text-align: center;
`;

export const Signup = props => (
  <Container>
    <Heading>Signup</Heading>
    <form>
      <Label>Username</Label>
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
    </form>
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