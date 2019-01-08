import React, { Component, Fragment } from 'react';
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Authenticate, LinkBtn } from "../components/PageElements";
import { GlobalStyle } from "../components/Styles";

const LandingContainer = styled.div`
  align-items: center;
  background: linear-gradient(90deg, #000000, transparent),
    url('https://res.cloudinary.com/dm6eoegii/image/upload/v1546915097/dragon-writer/typewriter_mobile_vertical.jpg') no-repeat center right fixed,
    #000000;
  background-size: cover;
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

const LandingInner = styled.div`
  align-items: center;
  color: #fff;
  width: 100%;
  @media (min-width: 450px) {
    width: 60%;
  }
`;

const TitleContainer = styled.div`
  padding: 80px 0 30px 0;
  text-align: center;
  width: 100%;
  h1 {
    font-size: 4.5rem;
    font-weight: bold;
    padding-bottom: 5px;
  }
  h2 {
    font-size: 1.7rem;
    padding-bottom: 5px;
  }
  p {
    font-size: 1.2rem;
  }
  @media (min-width: 450px) {
    padding: 100px 0 50px 0;
    h1 {
      font-size: 8rem;
      padding-bottom: 10px;
    }
    h2 {
      font-size: 3rem;
      padding-bottom: 10px;
    }
  }
`;

class Landing extends Component {
  render() {
    console.log(this.props);
    if (this.props.authenticated) return <Redirect to="/home" />;

    return (
      <LandingContainer>
        <GlobalStyle />
        <LandingInner>
          <TitleContainer>
            <h1>Dragon Writer</h1>
            <h2>Drag-and-drop storyboarding for writers</h2>
            {/* <p>Click<LinkBtn color="#bebebe">here</LinkBtn>for a tutorial.</p> */}
          </TitleContainer>
          <Authenticate getInitialData={this.props.getInitialData} />
        </LandingInner>
      </LandingContainer>
    );
  }
}

export default Landing;