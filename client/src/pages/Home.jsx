import React from 'react';
import styled from "styled-components";
import { Page } from "../components/PageElements";
import { ModalLogic, UploadLogic } from "../components/Renderers";
import { Authenticate, ProjectCard } from "../components/PageElements";

const Container = styled.div`
  padding-right: 200px;
  margin: auto;
`;

const Home = props => (
  <Page
    title="Dragon Writer"
    subtitle="Drag-and-drop storyboarding for writers"
    size="large"
    user={props.user}
    logout={props.logout}
    authenticated={props.authenticated}
    home="true"
    mode={props.mode}
    nextMode={props.nextMode}
    toggleStyleMode={props.toggleStyleMode}
  >
    <Container>
      <ModalLogic>
        {modalProps => (
          props.authenticated
            ? (
              <UploadLogic
                {...modalProps}
                getInitialData={props.getInitialData}
                type="project"
              >
                {provided => (
                  <ProjectCard
                    {...modalProps}
                    {...provided}
                    authenticated={props.authenticated}
                    getInitialData={props.getInitialData}
                    projects={props.projects}
                    user={props.user}
                  />
                )}
              </UploadLogic>
              // 'loading' prevents the login form from flashing on the screen while the app checks if a user already has a session cookie upon first page load
            ) : (
              !props.loading &&
              <Authenticate getInitialData={props.getInitialData} />
            )
        )}
      </ModalLogic>
    </Container>
  </Page>
);

export default Home;