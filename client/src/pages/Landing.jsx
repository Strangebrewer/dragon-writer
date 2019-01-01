import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Authenticate } from "../components/PageElements";
import { GlobalStyle } from "../components/Styles";

const LandingContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;
  min-height: 100vh;
  overflow-x: auto;
  /* position: relative; */
`;

class Landing extends Component {
  render() {
    console.log(this.props);
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