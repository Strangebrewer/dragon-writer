import React from "react";
import styled from "styled-components";
import { NewSubjectForm } from "./Elements/Forms";
import { Button } from "./Elements/FormElements/Button";

const buttonStyle= {
  marginLeft: "20px",
  marginTop: "10px",
  width: "100px"
}

const Container = styled.div`
  min-height: 150px;
`;

const HeadingTwo = styled.h2`
  color: ${props => props.theme.secondary};
  padding: 0;
  margin: 0;
  font-family: ${props => props.theme.heading};
  line-height: 1;
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.secondary};
  font-size: 2rem;
  /* font-weight: bold; */
`;

const LinkBtn = styled.button`
  background: transparent;
  border: none;
  outline: transparent;
  color: ${props => props.theme.link};
  padding: 0 10px 0 0;
  text-decoration: underline;
  cursor: pointer;
  line-height: 1.5;
  &:hover {
    color: ${props => props.theme.linkHover};
  }
`;

const Empty = styled.p`
  padding: 10px;
`;

const List = styled.ul`
  list-style: disc;
  padding-left: 10px;
`;

const ListItem = styled.li`
  margin-left: 10px;
`;

const SubjectList = props => {
  const { subjects, toggleSubject, create, toggleSubjectForm, clearAllTopics, toggleEditor, projectId } = props;
  return (
    <Container>
      <HeadingTwo>
        Topics <LinkBtn onClick={clearAllTopics}> (clear all)</LinkBtn>
      </HeadingTwo>
      {subjects.length === 0 && <Empty>You don't have any topics for this project yet.</Empty>}
      <List>
        {subjects.map(subject => (
          <ListItem key={subject._id}>
            <LinkBtn onClick={() => toggleSubject(subject._id)}>
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
          <Button onClick={toggleSubjectForm} style={buttonStyle}>
            New Topic
          </Button>
        )}
      <Button onClick={toggleEditor} style={buttonStyle}>
        New Text
      </Button>
    </Container>
  )
};

export default SubjectList;