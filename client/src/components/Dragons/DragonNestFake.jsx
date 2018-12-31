import React, { Component } from 'react';
import styled from 'styled-components';
import { ColumnButtons, DateDiv, ItemButtons } from "./DragonElements";

const ColumnContainer = styled.div`
  background: ${props => props.theme.pageBGLite};
  display: flex;
  flex-direction: column;
  margin: 10px;
  min-width: 260px;
  position: relative;
  width: 260px;
`;

const ListContainer = styled.div`
  border: 2px solid ${props => props.theme.links};
  box-shadow: ${props => props.theme.columnBS};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 8px;
  padding-top: 136px;
  border-radius: 5px;
  transition: all .2s ease-in-out;
`;

const SubjectHeader = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
`;

const Heading3 = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 5px 0 10px 0;
  padding: 0 8px;
  text-align: center;
`;

const Paragraph = styled.p`
  border-top: 1px solid ${props => props.theme.mainColor};
  color: ${props => props.theme.mainColor};
  font-size: 1.5rem;
  margin: 0 10px;
  min-height: 75px;
  padding: 8px;
  text-align: center;
`;

const ItemContainer = styled.div`
  background: ${props => props.theme.itemBG};
  border-radius: 5px;
  box-shadow: ${props => props.theme.fieldShine};
  color: ${props => props.theme.itemColor};
  margin-bottom: 8px;
  opacity: ${props => (
    props.dragging || props.loading
      ? "0.9"
      : "1"
  )};
  padding: 6px 8px 4px 8px;
  position: relative;
  transition: background-color .2s ease-in-out;
  width: 100%;
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