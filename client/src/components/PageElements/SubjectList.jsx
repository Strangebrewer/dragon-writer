import React from "react";
import styled from "styled-components";
import NewSubjectForm from "../Forms/NewSubjectForm";
import { LinkBtn } from "./LinkBtn";
import { Button } from "../Forms/FormElements";

const buttonStyle = {
  marginLeft: "20px",
  marginTop: "10px",
  width: "120px"
}

const Container = styled.div`
  background: transparent;
  min-height: 150px;
  width: 165px;
  h2 {
    border-bottom: 1px solid ${props => props.theme.headingColor};
    color: ${props => props.theme.headingColor};
    font-family: ${props => props.theme.hTypeface};
    font-size: 2.3rem;
    line-height: 1;
    margin: 0;
    padding: 0;
    padding-bottom: 5px;
  }
  p {
    padding: 10px 0 0 10px;
    font-size: 1.3rem;
  }
  ul {
    list-style: disc;
    padding-left: 10px;
  }
  li {
    margin-left: 10px;
  }
`;

const linkStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  textAlign: "left",
  whiteSpace: "nowrap",
  width: "140px"
}

export const SubjectList = props => {
  const {
    addSubjectToOrder,
    clearAllTopics,
    create,
    dragons,
    toggleDragonText,
    projectId,
    storyboardOn,
    subjects,
    toggleSingleNewEditor,
    toggleStoryboard,
    toggleSubject,
    toggleSubjectForm,
  } = props;

  return (
    <Container>
      <h2>
        Columns &nbsp;{
          (subjects.length > 0 && !storyboardOn)
            ? (
              <LinkBtn
                underline
                size="1.2rem"
                onClick={clearAllTopics}
              >
                clear all
          </LinkBtn>
            ) : null}
      </h2>

      {subjects.length === 0
        ? <p>You don't have any columns for this project yet.</p>
        : dragons || storyboardOn
          ? <p>click to switch columns:</p>
          : <p>click to toggle on/off:</p>}

      <ul>
        {subjects.map(subject => (
          <li key={subject._id}>
            <LinkBtn
              underline
              size="1.25rem"
              lineHeight="1.5"
              style={linkStyle}
              onClick={
                dragons
                  ? () => toggleDragonText(subject._id)
                  : storyboardOn
                    ? () => toggleStoryboard(subject._id)
                    : () => toggleSubject(subject._id)
              }
            >
              {subject.subject}
            </LinkBtn>
          </li>
        ))}
      </ul>

      {create
        ? (
          <NewSubjectForm
            addSubjectToOrder={addSubjectToOrder}
            projectId={projectId}
            toggleSubjectForm={toggleSubjectForm}
          />
        ) : (
          <React.Fragment>
            <Button onClick={toggleSubjectForm} style={buttonStyle}>
              New Column
            </Button>
            <Button
              disabled={subjects.length === 0}
              onClick={toggleSingleNewEditor}
              style={buttonStyle}
              title={subjects.length === 0 ? 'You must first create a column for your new item' : ''}
            >
              New Text
            </Button>
          </React.Fragment>
        )}
    </Container>
  )
};