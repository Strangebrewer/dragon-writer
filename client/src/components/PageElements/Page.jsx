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
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto auto 1fr auto;
  min-height: 100vh;
`;

const NavColumn = styled.div`
  grid-row: 3;
  grid-column: 1;
  padding: 0 20px 0 20px;
  position: fixed;
  top: 150px;
  width: 200px;
`;

const ContentColumn = styled.div`
  display: flex;
  grid-row: 3;
  grid-column: 2;
  overflow-x: auto;
`;

const FooterContainer = styled.div`
  grid-column: 1 / 3;
  grid-row: 4;
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
  align-items: center;
  color: #fff;
  grid-column: 1 / 3;
  grid-row: 2;
  margin: ${props => (
    props.home
      ? "30px auto"
      : "30px auto 10px auto"
  )};
  padding: 5px 0 8px 0;
  text-align: center;
  transition: color .3s ease-in;
  width: ${props => props.home ? '600px' : '100%'};
  h2 {
    font-family: ${props => props.theme.hTypeface};
    font-size: ${props => props.home ? "7rem" : "3rem"};
  }
  h3 {
    display: ${props => !props.home && 'none'};
    font-size: ${props => props.home ? "2.2rem" : "1.5rem"};
    font-weight: bold;
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
    console.log(this.props);
    const { props } = this;
    return (
      <PageContainer id="top">
        <GlobalStyle />
        <Navbar
          authenticated={props.authenticated}
          logout={props.logout}
          user={props.user}
        />

        <TitleContainer home={props.home}>
          <h2>{props.title}</h2>
          <h3>{props.subtitle}</h3>
        </TitleContainer>

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