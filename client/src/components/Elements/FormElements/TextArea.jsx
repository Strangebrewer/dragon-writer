import React from "react";
import styled from "styled-components";

const TextField = styled.textarea`
  display: block;
  border: 3px solid ${props => props.theme.link};
  background-color: ${props => props.theme.lightgrey};
  color: ${props => props.theme.bg};
  border-radius: 5px;
  padding: 5px;
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 5px;
`;

export class TextArea extends React.PureComponent {
  render() {
    return <TextField {...this.props} />
  }
}