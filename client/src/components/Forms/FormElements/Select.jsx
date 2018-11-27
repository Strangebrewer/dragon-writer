import React from "react";
import styled from "styled-components";

const Dropdown = styled.select`
  display: block;
  border: 2px solid ${props => props.theme.links};
  background-color: ${props => props.theme.fieldBG};
  color: ${props => props.theme.fieldColor};
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 5px;
  outline: transparent;
  box-shadow: ${props => props.theme.fieldShadow};
`;

export const Select = props => (
  <Dropdown {...props}>{props.children}</Dropdown>
);