import React from 'react';
import { Navbar } from './Navbar';
import SubjectList from "./SubjectList";
import styled from "styled-components";
import { GlobalStyle } from "../../utils";

const PageContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto auto 1fr auto;
  background: ${props => props.theme.pageBG};
  color: ${props => props.theme.mainColor};
  font-family: ${props => props.theme.typeface};
`;

const NavColumn = styled.div`
  grid-row: 3;
  grid-column: 1;
  width: 200px;
  position: fixed;
  top: 150px;
  padding: 0 20px 0 20px;
`;

const ContentColumn = styled.div`
  grid-row: 3;
  grid-column: 2 / 4;
  display: flex;
  overflow-x: auto;
`;

const FooterContainer = styled.div`
  grid-column: 1 / 4;
  grid-row: 4;
  height: 90px;
`;

const TitleContainer = styled.div`
  color: ${props => props.home
    ? props.theme.homeBannerColor
    : props.theme.bannerColor
  };
  grid-column: 1 / 4;
  grid-row: 2;
  text-align: center;
  margin: ${props => (
    props.dragons
      ? "30px auto 15px auto"
      : "30px auto"
  )};
  width: ${props => props.home ? '600px' : '100%'};
  transition: color .3s ease-in;
  background: ${props =>
    props.home
      ? props.theme.homeBannerBG
      : props.theme.bannerBG
  };
  box-shadow: ${props => props.home ? '6px 6px 2px #000' : 'none'};
  padding: 5px 0 8px 0;
  align-items: center;  
  h2 {
    font-family: ${props => props.theme.hTypeface};
    font-size: ${props => props.size === 'large' ? "5" : "3"}rem;
  }
  h3 {
    margin-top: 10px;
    font-weight: bold;
    font-size: ${props => props.size === 'large' ? "1.65" : "1.5"}rem;
  }
`;

export const Page = props => {
  return (
    <PageContainer >
      <GlobalStyle />
      <Navbar
        authenticated={props.authenticated}
        logout={props.logout}
        user={props.user}
        mode={props.mode}
        nextMode={props.nextMode}
        toggleStyleMode={props.toggleStyleMode}
      />

      <TitleContainer
        dragons={props.dragons}
        home={props.home}
        size={props.size}
        subtitle={props.subtitle}
        title={props.title}
      >
        <h2 title={props.subtitle}>{props.title}</h2>
        {props.home && <h3>{props.subtitle}</h3>}
      </TitleContainer>

      <NavColumn>
        {props.subjects && !props.editorOn &&
          <SubjectList
            clearAllTopics={props.clearAllTopics}
            create={props.create}
            dragons={props.dragons}
            dragonTextOn={props.dragonTextOn}
            projectId={props.projectId}
            subjects={props.subjects}
            toggleEditor={props.toggleEditor}
            toggleSingleNewEditor={props.toggleSingleNewEditor}
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
};