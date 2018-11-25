import React, { PureComponent } from 'react';
import styled from "styled-components";

const FormButton = styled.button`
  border: 1px solid ${props => props.theme.bg};
  /* border: 1px solid ${props => props.theme.bg}b2; */
  /* border-radius: 10px; */
  cursor: pointer;
  outline: transparent;
  color: #fff;
  box-shadow: 0 0 20px 20px ${props => props.theme.button} inset, 0 0 0 0 ${props => props.theme.button};
	transition: all 0.2s ease-in-out;
  padding: 8px 12px;
  margin: 5px 10px 0 0;
  &:active, &:enabled:hover {
    background-color: ${props => props.theme.offwhite};
    box-shadow: 0 0 5px ${props => props.theme.button} inset, 0 0 5px ${props => props.theme.button};
    color: ${props => props.theme.button};
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

export class Button extends PureComponent {
  render() {
    return (
      <FormButton {...this.props}>{this.props.children}</FormButton>
    );
  }
}