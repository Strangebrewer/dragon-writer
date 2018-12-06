import React, { Component } from 'react';
import styled from 'styled-components';
import { ColumnButtons, DateDiv, ItemButtons } from "./DragonElements";

const ColumnContainer = styled.div`
  position: relative;
  width: 260px;
  min-width: 260px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.pageBGLite};
`;

const ListContainer = styled.div`
  padding: 8px;
  padding-top: 136px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-radius: 5px;
  transition: all .2s ease-in-out;
  border-color: ${props => props.theme.links};
  border-width: 2px;
  border-style: solid;
  box-shadow: ${props => props.theme.columnBS};
`;

const SubjectHeader = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
`;

const Heading3 = styled.div`
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
  padding: 0 8px;
  margin: 5px 0 10px 0;
`;

const Paragraph = styled.p`
  margin: 0 10px;
  font-size: 1.5rem;
  padding: 8px;
  border-top: 1px solid ${props => props.theme.mainColor};
  min-height: 75px;
  color: ${props => props.theme.mainColor};
  text-align: center;
`;

const ItemContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  border-radius: 5px;
  padding: 6px 8px 4px 8px;
  transition: background-color .2s ease-in-out;
  box-shadow: ${props => props.theme.fieldShine};
  opacity: ${props => (
    props.dragging || props.loading
      ? "0.9"
      : "1"
  )};
  background: ${props => props.theme.itemBG};
  color: ${props => props.theme.itemColor};
  h4 {
    font-size: 1.8rem;
    font-weight: bold;
    padding-bottom: 2px;
  }
  p {
    font-size: 1.5rem;
    padding-left: 12px;
  }
`;

export class DragonNestFake extends Component {
  render() {
    const { subject, texts } = this.props;
    return (
      <ColumnContainer>
        <ColumnButtons
          deleteSubjectModal="nothing"
          disabled={true}
          dragonTextOn="nothing"
          id={subject._id}
          index={subject._id}
          subject={subject}
          toggleEditor="nothing"
          toggleInlineNew="nothing"
          updateSubjectModal="nothing"
        />

        <SubjectHeader>
          <Heading3>{subject.subject}</Heading3>
          <Paragraph>{subject.theme}</Paragraph>
        </SubjectHeader>

        <ListContainer>
          {texts.map((text, index) => (
            <ItemContainer key={text._id}>
              <ItemButtons
                deleteTextModal="nothing"
                disabled={true}
                index={index}
                seeFullText="nothing"
                subject={subject}
                text={text}
                toggleEditor="nothing"
                toggleInlineEdit="nothing"
              />

              <h4>{text.title}</h4>
              <p>{text.thesis}</p>

              <DateDiv text={text} />
            </ItemContainer>
          ))}
        </ListContainer>

      </ColumnContainer>
    )
  }
};