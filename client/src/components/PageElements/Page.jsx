import React, { PureComponent } from 'react';
import { Navbar } from './Navbar';
import SubjectList from "./SubjectList";
import styled from "styled-components";
import { GlobalStyle } from "../Styles";

const PageContainer = styled.div`
  background: ${props => props.theme.pageBG};
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
`;

const TitleContainer = styled.div`
  align-items: center;
  background: ${props =>
    props.home
      ? props.theme.homeBannerBG
      : props.theme.bannerBG
  };
  box-shadow: ${props => props.home ? '6px 6px 2px #000' : 'none'};
  color: ${props => props.home
    ? props.theme.homeBannerColor
    : props.theme.bannerColor
  };
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
    font-size: ${props => props.home ? "5rem" : "3rem"};
  }
  h3 {
    font-size: ${props => props.home ? "1.65rem" : "1.5rem"};
    font-weight: bold;
    margin-top: 10px;
  }
`;

export class Page extends PureComponent {
  render() {
    console.log(this.props);
    const { props } = this;
    return (
      <PageContainer >
        <GlobalStyle />
        <Navbar
          authenticated={props.authenticated}
          logout={props.logout}
          nextMode={props.nextMode}
          toggleStyleMode={props.toggleStyleMode}
          user={props.user}
        />

        <TitleContainer
          dragons={props.dragons}
          home={props.home}
          size={props.size}
          storyboardOn={props.storyboardOn}
          subtitle={props.subtitle}
          title={props.title}
        >
          <h2 title={props.subtitle}>{props.title}</h2>
          {/* only the home page shows a subtitle */}
          {props.home && <h3>{props.subtitle}</h3>}
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

        <FooterContainer></FooterContainer>
      </PageContainer >
    );
  }
};