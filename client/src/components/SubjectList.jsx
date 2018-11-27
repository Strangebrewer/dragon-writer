import React from "react";
import styled from "styled-components";
import { NewSubjectForm } from "./Forms";
import LinkBtn from "./Elements/LinkBtn";
import { Button } from "./Forms/FormElements";

const buttonStyle = {
  marginLeft: "20px",
  marginTop: "10px",
  width: "120px"
}

const Container = styled.div`
  min-height: 150px;
  width: 165px;
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
    clearAllTopics,
    create,
    dragons,
    dragonTextOn,
    projectId,
    subjects,
    toggleEditor,
    toggleSubject,
    toggleSubjectForm,
  } = props;

  return (
    <Container>
      <HeadingTwo>
        Columns {subjects.length > 0 && <LinkBtn underline onClick={clearAllTopics}> clear all</LinkBtn>}
      </HeadingTwo>

      {subjects.length === 0
        ? <Message>You don't have any columns for this project yet.</Message>
        : <Message>click to toggle on/off</Message>}

      <List>
        {subjects.map(subject => (
          <ListItem key={subject._id}>
            <LinkBtn
              underline
              lineHeight="1.5"
              onClick={
                dragons
                  ? () => dragonTextOn(subject._id)
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
            toggleSubjectForm={toggleSubjectForm}
            projectId={projectId}
          />
        ) : (
          <React.Fragment>
            <Button onClick={toggleSubjectForm} style={buttonStyle}>
              New Column
            </Button>
            <Button onClick={toggleEditor} style={buttonStyle}>
              New Text
            </Button>
          </React.Fragment>
        )}
    </Container>
  )
};

export default SubjectList;