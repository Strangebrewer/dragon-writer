import React from 'react';
import Nav from './Nav';
import SubjectList from "../SubjectList";
import styled from "styled-components";
// import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../../GlobalStyle";
// import { nightmode } from "../../utils/Theme";

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
  color: ${props => props.theme.homeHeaderColor};
  grid-column: 1 / 4;
  grid-row: 2;
  text-align: center;
  margin: ${props => (
    props.dragons
      ? "30px auto 15px auto"
      : "30px auto"
  )};
  width: ${props => (props.home ? '600px' : '100%')};
  transition: color .3s ease-in;
  background: ${props => (props.home ? props.theme.homeHeaderBG : props.theme.secondary)};
  box-shadow: ${props => (props.home ? '6px 6px 2px #000' : 'none')};
  padding: 5px 0 8px 0;
  align-items: center;  
  h2 {
    font-family: ${props => props.theme.hTypeface};
    font-size: ${props => (
    props.size === 'large'
      ? "5rem"
      : "3rem"
  )};
  }
  h3 {
    margin-top: 10px;
    font-weight: bold;
    font-size: ${props => (
    props.size === 'large'
      ? "1.65rem"
      : "1.5rem"
  )};
  }
`;

const Page = props => {
  const {
    authenticated,
    children,
    clearAllTopics,
    create,
    dragons,
    dragonTextOn,
    editorOn,
    home,
    logout,
    projectId,
    size,
    subjects,
    subtitle,
    title,
    toggleEditor,
    toggleSubject,
    toggleSubjectForm,
    user
  } = props;

  return (
    // <ThemeProvider theme={nightmode}>
      <PageContainer >
      <GlobalStyle />
        <Nav
          authenticated={authenticated}
          logout={logout}
          user={user}
        />

        <TitleContainer
          dragons={dragons}
          home={home}
          size={size}
          subtitle={subtitle}
          title={title}
        >
          <h2 title={subtitle}>{title}</h2>
          {home && <h3>{subtitle}</h3>}
        </TitleContainer>

        <NavColumn>
          {subjects && !editorOn &&
            <SubjectList
              clearAllTopics={clearAllTopics}
              create={create}
              dragons={dragons}
              dragonTextOn={dragonTextOn}
              projectId={projectId}
              subjects={subjects}
              toggleEditor={toggleEditor}
              toggleSubject={toggleSubject}
              toggleSubjectForm={toggleSubjectForm}
            />}
        </NavColumn>

        <ContentColumn>
          {children}
        </ContentColumn>

        <FooterContainer></FooterContainer>
      </PageContainer >
    // </ThemeProvider>
  );
}

export default Page;