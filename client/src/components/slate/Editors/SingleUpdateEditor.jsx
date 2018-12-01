import React, { Component } from 'react';
import styled from 'styled-components';
import DragonColumnFake from "../../DragonColumnFake";

const OuterContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: transparent;
`;

export class SingleUpdateEditor extends Component {
  render() {
    const { subject, text, texts } = this.props;
    console.log(this.props);
    return (
      <OuterContainer>
        <DragonColumnFake
          subject={subject}
          texts={texts}
        />

      </OuterContainer>
    );
  }
}