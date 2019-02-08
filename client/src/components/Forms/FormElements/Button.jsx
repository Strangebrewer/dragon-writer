import React from 'react';
import styled from "styled-components";

const FormButton = styled.button`
  background-color: #1d928c;
  border: none;
  border-radius: 2px;
  color: #fff;
  display: ${props => props.center ? 'block' : 'inline'};
  font-size: ${props => props.full && '1.8rem'};
  height: ${props => props.full && '40px'};
  margin: ${props => props.center ? '10px auto 0 auto' : '10px 10px 0 0'};
  outline: transparent;
  padding: 8px 12px;
  text-shadow: 0 0 5px #000;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  width: ${props => props.full ? '100%' : props.width};
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
  <FormButton {...props}>{props.children}</FormButton>
);