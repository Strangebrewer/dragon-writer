import React from "react";
import styled from "styled-components";

const Dropdown = styled.select`
  display: block;
  border: 3px solid ${props => props.theme.link};
  background-color: ${props => props.theme.midGrey};
  color: ${props => props.theme.bg};
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  outline: transparent;
  box-shadow: ${props => props.theme.formShadow};
`;

export const Select = props => (
  <Dropdown {...props}>
    {props.children}
  </Dropdown>
);