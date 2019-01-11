import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Authenticate } from "../components/PageElements";
import { GlobalStyle } from "../components/Styles";

const LandingContainer = styled.div`
  align-items: center;
  background: linear-gradient(90deg, #000000, #00000000, #000000),
    linear-gradient(#000000, #00000000, #000000),
    url('/static/assets/images/background-two.jpg') repeat;
  color: #fff;
  min-height: 100vh;
  overflow-x: auto;
  position: relative;
  @media (min-width: 450px) {
    background: linear-gradient(90deg, #000000ec, #00000035, #000000ec),
      linear-gradient(#000000ec, #00000035, #000000ec),
      url('/static/assets/images/background-two.jpg') repeat;
  }
`;

const TitleContainer = styled.div`
  margin: 80px 0;
  text-align: center;
  width: 100%;
  h1 {
    font-size: 4.2rem;
    font-family: 'Abril Fatface';
    padding-bottom: 5px;
  }
  h2 {
    font-size: 1.6rem;
    font-family: 'Raleway';
    padding-bottom: 5px;
  }
  p {
    font-size: 1.2rem;
  }
  @media (min-width: 450px) {
    h1 {
      font-size: 8rem;
      padding-bottom: 10px;
    }
    h2 {
      font-size: 2.5rem;
      padding-bottom: 10px;
    }
  }
`;

const AuthContainer = styled.div`
  width: 300px;
  padding-bottom: 205px;
  margin: auto;
`;

class Landing extends Component {
  render() {
    console.log(this.props);
    if (this.props.authenticated) return <Redirect to="/home" />;

    return (
      <LandingContainer>
        <GlobalStyle />
          <TitleContainer>
            <h1>Dragon Writer</h1>
            <h2>Drag-and-drop storyboarding for writers</h2>
            {/* <p>Click<LinkBtn color="#bebebe">here</LinkBtn>for a tutorial.</p> */}
          </TitleContainer>

          <AuthContainer>
            <Authenticate getInitialData={this.props.getInitialData} />
          </AuthContainer>
      </LandingContainer>
    );
  }
}

export default Landing;