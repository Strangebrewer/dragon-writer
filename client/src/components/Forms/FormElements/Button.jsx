import React from 'react';
import styled from "styled-components";

const FormButton = styled.button`
  background: transparent;
  border: none;
  border-radius: ${props => props.round ? '5px' : 'none'};
  box-shadow: 0 0 20px 20px ${props => props.theme.buttonBG} inset, 0 0 0 0 ${props => props.theme.buttonBG};
  color: ${props => props.theme.buttonColor};
  cursor: pointer;
  display: ${props => props.center ? 'block' : 'inline'};
  font-size: ${props => props.full && '1.8rem'};
  height: ${props => props.full && '40px'};
  margin: ${props => props.center ? '10px auto 0 auto' : '10px 10px 0 0'};
  outline: transparent;
  padding: 8px 12px;
	transition: all 0.2s ease-in-out;
  width: ${props => props.full && '100%'};

  &:active, &:enabled:hover {
    background-color: ${props => props.theme.buttonHoverBG};
    box-shadow: inset 0 0 5px 3px ${props => props.theme.buttonBG}, 0 0 5px ${props => props.theme.buttonBG};
    color: ${props => props.theme.buttonHoverColor};
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: .6;
  }
  &[disabled]:hover {
    /* border: 2px solid ${props => props.theme.black}; */
    background-color: ${props => props.theme.black};
    box-shadow: inset 0 0 5px 3px ${props => props.theme.black}, 0 0 5px ${props => props.theme.black};
    color: ${props => props.theme.black};
  }
`;

export const Button = props => (
  <FormButton {...props}>{props.children}</FormButton>
);