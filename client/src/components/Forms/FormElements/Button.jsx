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
	transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out, background-color 0.2s ease-in-out;
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

const FormButtonTwo = styled.button`
  background-color: #1d928c;
  border: none;
  border-radius: 2px;
  /* box-shadow: 0 4px 4px #000; */
  color: #fff;
  display: ${props => props.center ? 'block' : 'inline'};
  font-size: ${props => props.full && '1.8rem'};
  height: ${props => props.full && '40px'};
  margin: ${props => props.center ? '10px auto 0 auto' : '10px 10px 0 0'};
  outline: transparent;
  padding: 8px 12px;
  text-shadow: 0 0 5px #000;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  width: ${props => props.full && '100%'};
  &:enabled:hover {
    background-color: #26d4cc;
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: .6;
  }
  &[disabled]:hover {
    background-color: #999;
    color: #222;
  }
`;

export const Button = props => (
  <FormButtonTwo {...props}>{props.children}</FormButtonTwo>
);