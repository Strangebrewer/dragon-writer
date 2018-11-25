import React from 'react';
import styled from "styled-components";
import { Button, Input, Label } from "../FormElements";

const Container = styled.div`
width: 300px;
margin: auto;
padding: 20px;
border: 1px solid ${props => props.theme.linkHover};
border-radius: 10px;
`;

export const Login = props => (
  <Container>
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
    <Button onClick={props.login}>Submit</Button>
  </Container>
);