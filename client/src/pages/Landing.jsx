import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Authenticate } from "../components/PageElements";
import { GlobalStyle } from "../components/Styles";

const LandingContainer = styled.div`
  align-items: center;
  background: linear-gradient(90deg, #000000, transparent),
    url('https://res.cloudinary.com/dm6eoegii/image/upload/v1546811760/dragon-writer/typewriter.jpg') no-repeat center center fixed,
    #000000;
  background-size: cover;
  display: flex;
  justify-content: center;
  margin: auto;
  min-height: 100vh;
  overflow-x: auto;
  /* position: relative; */
  @media (min-width: 450px) {
  background: linear-gradient(90deg, #000000, transparent),
    url('https://res.cloudinary.com/dm6eoegii/image/upload/v1546811760/dragon-writer/typewriter.jpg') no-repeat center center fixed,
    #000000;
    background-size: cover;
  }
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