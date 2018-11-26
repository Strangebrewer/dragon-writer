import React from 'react';
import styled from "styled-components";

const FormButton = styled.button`
  border: 1px solid ${props => props.theme.buttonBG};
  cursor: pointer;
  outline: transparent;
  color: ${props => props.theme.buttonColor};
  box-shadow: 0 0 20px 20px ${props => props.theme.buttonBG} inset, 0 0 0 0 ${props => props.theme.buttonBG};
	transition: all 0.2s ease-in-out;
  padding: 8px 12px;
  margin: 5px 10px 0 0;
  &:active, &:enabled:hover {
    background-color: ${props => props.theme.buttonHoverBG};
    box-shadow: 0 0 5px ${props => props.theme.buttonBG} inset, 0 0 5px ${props => props.theme.buttonBG};
    color: ${props => props.theme.buttonHoverColor};
  }
  &[disabled] {
    opacity: .6;
    cursor: not-allowed;
  }
  &[disabled]:hover {
    border: 1px solid ${props => props.theme.black};
    background-color: ${props => props.theme.black};
    box-shadow: 0 0 5px ${props => props.theme.black} inset, 0 0 5px ${props => props.theme.black};
    color: ${props => props.theme.black};
  }
`;

export const Button = props => (
  <FormButton {...props}>{props.children}</FormButton>
);