import React from "react";
import styled from "styled-components";

const TextField = styled.textarea`
  display: block;
  border: 2px solid ${props => props.theme.link};
  background-color: ${props => props.theme.midGrey};
  box-shadow: ${props => props.theme.formShadow};
  color: ${props => props.theme.bg};
  border-radius: 5px;
  padding: 5px;
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 5px;
`;

export const TextArea = props => (
  <TextField {...props} />
);