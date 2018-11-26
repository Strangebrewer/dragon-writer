import React from "react";
import styled from "styled-components";

const InputField = styled.input`
  display: block;
  border: 2px solid ${props => props.theme.links};
  background-color: ${props => props.theme.fieldBG};
  color: ${props => props.theme.fieldColor};
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  margin-bottom: 5px;
  outline: transparent;
  box-shadow: ${props => props.theme.fieldShadow};
`;

export const Input = props => (
  <InputField {...props} />
);