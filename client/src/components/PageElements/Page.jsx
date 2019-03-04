import React, { PureComponent } from 'react';
import AnchorLink from "react-anchor-link-smooth-scroll"
import styled from "styled-components";
import { Navbar } from './Navbar';
import { SubjectList } from "../PageElements";
import { GlobalStyle } from "../Styles";

const PageContainer = styled.div`
  color: ${props => props.theme.mainColor};
  display: grid;
  font-family: ${props => props.theme.typeface};
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const Header = styled.div`
  grid-row: 1;
  position: fixed;
  top: 0;
  width: 100vw;
`;

const NavColumn = styled.div`
  padding: 0 20px;
  position: fixed;
  left: 0;
  top: 150px;
  bottom: 0;
  width: 200px;
`;

const ContentColumn = styled.div`
  grid-row: 2;
  display: flex;
  margin-top: 100px;
  position: relative;
  width: 100vw;
`;

const FooterContainer = styled.div`
  grid-row: 3;
  height: 90px;
  a {
    background: #ebebeb12;
    background: rgba(234, 234, 234, 0.071);
    border-radius: 50%;
    color: rgba(44, 156, 151, 0.157);
    color: #2c9c9728;
    font-size: 2rem;
    height: 40px;
    opacity: 0;
    padding: 9px;
    position: fixed;
    bottom: 10px;
    right: 10px;
    text-align: center;
    transition: opacity 1s ease-in-out,
      background-color .3s ease-in-out,
      color .3s ease-in-out;
    width: 40px;
    &:hover {
      background: #ebebeb55;
      color: #2c9c97;
    }
  }
`;

const TitleContainer = styled.div`
  color: #fff;
  margin: 0 auto;
  padding: 1px 0;
  text-align: center;
  transition: color .3s ease-in;
  h2 {
    font-family: ${props => props.theme.hTypeface};
    font-size: ${props => props.home ? "8rem" : "3rem"};
  }
  h3 {
    display: ${props => !props.home && 'none'};
    font-family: 'Raleway';
    font-size: ${props => props.home ? "2.5rem" : "1.5rem"};
    margin-top: 10px;
  }
`;

export class Page extends PureComponent {
  state = {
    arrowStyle: {}
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll = () => {
    if (window.scrollY > 100)
      this.setState({ arrowStyle: { opacity: "1", cursor: "pointer" } });
    if (window.scrollY < 100)
      this.setState({ arrowStyle: { opacity: "0", cursor: "unset" } });
  };

  render() {
    const { props } = this;
    return (
      <PageContainer id="top">
        <GlobalStyle />

        <Header>
          <Navbar
            authenticated={props.authenticated}
            logout={props.logout}
            user={props.user}
          />

          <TitleContainer home={props.home}>
            <h2>{props.title}</h2>
            <h3>{props.subtitle}</h3>
          </TitleContainer>
        </Header>

        <NavColumn>
          {props.subjects && !props.editorOn &&
            <SubjectList
              addSubjectToOrder={props.addSubjectToOrder}
              clearAllTopics={props.clearAllTopics}
              create={props.create}
              dragons={props.dragons}
              projectId={props.projectId}
              storyboardOn={props.storyboardOn}
              subjects={props.subjects}
              toggleDragonText={props.toggleDragonText}
              toggleSingleNewEditor={props.toggleSingleNewEditor}
              toggleStoryboard={props.toggleStoryboard}
              toggleSubject={props.toggleSubject}
              toggleSubjectForm={props.toggleSubjectForm}
            />}
        </NavColumn>

        <ContentColumn>
          {props.children}
        </ContentColumn>

        <FooterContainer>
          <AnchorLink href="#top" style={this.state.arrowStyle}>
            <i className="fas fa-arrow-up" />
          </AnchorLink>
        </FooterContainer>
      </PageContainer>
    );
  }
};