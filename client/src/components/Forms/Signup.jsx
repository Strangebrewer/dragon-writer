import React, { Fragment } from 'react';
import styled from "styled-components";
import { Button, Form, Input, Label } from "./FormElements";
import { LinkBtn } from "../PageElements";

const InfoBlock = styled.div`
  font-size: 1.2rem;
  margin: 10px 0;
  ul {
    padding-left: 20px;
  }
  li {
    padding-bottom: 10px;
  }
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  text-align: center;
`;

export const Signup = props => (
  <Fragment>
    <Form style={{ paddingBottom: "10px"}}>
      <h2>Signup</h2>
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
      <Paragraph>Already have an account?
      <LinkBtn
          size="1.5rem"
          shadow
          text
          onClick={props.toggleSignupForm}
        >
          Log in.
      </LinkBtn>
      </Paragraph>
    </Form>

    <InfoBlock>
      <ul>
        <li>Usernames must be alphanumeric and begin with a letter</li>
        <li>Your email is retained for password recovery only and will not be shared with anyone</li>
      </ul>
    </InfoBlock>
  </Fragment>
);