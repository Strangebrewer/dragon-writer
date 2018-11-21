import React from "react";
import styled from "styled-components";

const Dropdown = styled.select`
  display: block;
  padding: 3px;
  margin-bottom: 5px;
`;

export const Select = props => (
  <Dropdown {...props}>
    {props.children}
  </Dropdown>
);