import React, { PureComponent } from 'react';
import styled from "styled-components";

const FormButton = styled.button`
  border: 1px solid ${props => props.theme.secondary};
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  box-shadow: 0 0 20px 20px ${props => props.theme.secondary}e2 inset, 0 0 0 0 ${props => props.theme.secondary}e2;
	transition: all 0.2s ease-in-out;
  padding: 8px 12px;
  margin: 5px 10px 0 0;
  &:active, &:hover {
    background-color: #fff;
    box-shadow: 0 0 5px ${props => props.theme.secondary}e2 inset, 0 0 5px ${props => props.theme.secondary}e2;
    color: ${props => props.theme.secondary};
  }
`;

export class Button extends PureComponent {
  render() {
    return (
      <FormButton {...this.props}>{this.props.children}</FormButton>
    );
  }
}