import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Authenticate } from "../components/PageElements";
import { GlobalStyle } from "../components/Styles";

const LandingContainer = styled.div`
  /* position: relative; */
  display: flex;
  overflow-x: auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

class Landing extends Component {
  render() {
    if (this.props.authenticated) {
      return <Redirect to="/home" />
    }
    return (
      <LandingContainer>
        <GlobalStyle />
        <Authenticate getInitialData={this.props.getInitialData} />
      </LandingContainer>
    );
  }
}

export default Landing;