import React, { Component } from 'react';
import Nav from './Nav';
import SubjectList from "../SubjectList";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto auto 1fr auto;
`;

const TitleContainer = styled.div`
  grid-column: 1 / 4;
  grid-row: 2;
  text-align: center;
  margin: 30px auto 20px auto;
  width: 100%;
  background: ${props => props.theme.lightgrey};
  padding: 15px 0;
  align-items: center;
`;

const NavColumn = styled.div`
  grid-row: 3;
  grid-column: 1;
  width: 200px;
  position: fixed;
  top: 100px;
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

class Page extends Component {
  render() {
    const { user, projectId, subjects, logout,
      authenticated, title, toggleSubject,
      create, toggleSubjectForm, children,
      toggleEditor, clearAllTopics } = this.props;
    return (
      <PageContainer >
        <Nav
          user={user}
          logout={logout}
          authenticated={authenticated}
        />

        <TitleContainer>
          <h2>{title}</h2>
        </TitleContainer>

        <NavColumn>
          {subjects &&
            <React.Fragment>
              <SubjectList
                subjects={subjects}
                toggleSubject={toggleSubject}
                toggleSubjectForm={toggleSubjectForm}
                toggleEditor={toggleEditor}
                projectId={projectId}
                create={create}
                clearAllTopics={clearAllTopics}
              />
            </React.Fragment>}
        </NavColumn>

        <ContentColumn>
          {children}
        </ContentColumn>

        <FooterContainer></FooterContainer>
      </PageContainer >
    );
  }
}

export default Page;