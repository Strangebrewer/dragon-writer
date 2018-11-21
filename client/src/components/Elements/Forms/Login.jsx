import React from 'react';
import styled from "styled-components";
import { Button, Input } from "../FormElements";

const Container = styled.div`
width: 300px;
margin: auto;
padding: 20px;
border: 1px solid green;
`;

export const Login = props => (
  <Container>
    <Input
      name="username"
      value={props.username}
      type="text"
      onChange={props.handleInputChange}
      placeholder="username"
    />
    <Input
      name="password"
      value={props.password}
      type="password"
      onChange={props.handleInputChange}
      placeholder="password"
    />
    <Button onClick={props.login}>Submit</Button>
  </Container>
);