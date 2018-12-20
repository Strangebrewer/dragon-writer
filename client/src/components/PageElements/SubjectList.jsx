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
  min-height: 150px;
  width: 165px;
  background: transparent;
`;

const HeadingTwo = styled.h2`
  color: ${props => props.theme.headingColor};
  padding: 0;
  margin: 0;
  font-family: ${props => props.theme.hTypeface};
  line-height: 1;
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.headingColor};
  font-size: 2.3rem;
  text-shadow: 1px 1px 0 ${props => props.theme.midGrey};
  /* font-weight: bold; */
`;

const Message = styled.p`
  padding: 10px 0 0 10px;
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
        Columns {subjects.length > 0 &&
          <LinkBtn underline onClick={clearAllTopics}> clear all</LinkBtn>}
      </HeadingTwo>

      {subjects.length === 0
        ? <Message>You don't have any columns for this project yet.</Message>
        : dragons
          ? <Message>click to switch columns:</Message>
          : <Message>click to toggle on/off:</Message>}

      <List>
        {subjects.map(subject => (
          <ListItem key={subject._id}>
            <LinkBtn
              underline
              fancy
              size="1.5rem"
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
          />
        ) : (
          <React.Fragment>
            <Button onClick={toggleSubjectForm} style={buttonStyle}>
              New Column
            </Button>
            <Button onClick={toggleSingleNewEditor} style={buttonStyle}>
              New Item
            </Button>
          </React.Fragment>
        )}
    </Container>
  )
};

export default SubjectList;