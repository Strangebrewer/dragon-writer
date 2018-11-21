import React from "react";
import styled from "styled-components";

const TextField = styled.textarea`
  display: block;
  padding: 3px;
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 5px;
`;

export class TextArea extends React.PureComponent {
  render() {
    return <TextField {...this.props} />
  }
}