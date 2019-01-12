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
`;

const HeadingTwo = styled.h2`
  border-bottom: 1px solid ${props => props.theme.headingColor};
  color: ${props => props.theme.headingColor};
  font-family: ${props => props.theme.hTypeface};
  font-size: 2.3rem;
  /* font-weight: bold; */
  line-height: 1;
  margin: 0;
  padding: 0;
  padding-bottom: 5px;
  /* text-shadow: 1px 1px 0 ${props => props.theme.midGrey}; */
`;

const Message = styled.p`
  padding: 10px 0 0 10px;
  font-size: 1.3rem;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 10px;
`;

const ListItem = styled.li`
  margin-left: 10px;
`;

const SubjectList = props => {
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
      <HeadingTwo>
        Columns &nbsp;{subjects.length > 0 &&
          <LinkBtn
            underline
            size="1.2rem"
            onClick={clearAllTopics}
          >
            clear all
             </LinkBtn>}
      </HeadingTwo>

      {subjects.length === 0
        ? <Message>You don't have any columns for this project yet.</Message>
        : dragons || storyboardOn
          ? <Message>click to switch columns:</Message>
          : <Message>click to toggle on/off:</Message>}

      <List>
        {subjects.map(subject => (
          <ListItem key={subject._id}>
            <LinkBtn
              underline
              fancy
              size="1.25rem"
              lineHeight="1.5"
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
          </ListItem>
        ))}
      </List>

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
              New Item
            </Button>
          </React.Fragment>
        )}
    </Container>
  )
};

export default SubjectList;