import React from "react";
import styled from "styled-components";

const InputField = styled.input`
  display: block;
  padding: 3px;
  width: 100%;
  margin-bottom: 5px;
`;

export class Input extends React.PureComponent {
  render() {
    return <InputField {...this.props} />
  }
}