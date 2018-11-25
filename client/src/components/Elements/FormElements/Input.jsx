import React from "react";
import styled from "styled-components";

const InputField = styled.input`
  display: block;
  border: 2px solid ${props => props.theme.link};
  background-color: ${props => props.theme.midGrey};
  color: ${props => props.theme.bg};
  border-radius: 5px;
  padding: 5px;
  width: 100%;
  margin-bottom: 5px;
  outline: transparent;
  box-shadow: ${props => props.theme.formShadow};
`;

export class Input extends React.PureComponent {
  render() {
    return <InputField {...this.props} />
  }
}