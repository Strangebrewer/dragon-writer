import React, { Component } from 'react';
import styled from 'styled-components';
import { ColumnButtons, ItemButtons } from "./DragonElements";

const ColumnContainer = styled.div`
  background: #ffffff22;
  border-left: 1px solid rgb(255, 255, 255, 0.183);
  border-top: 1px solid rgb(255, 255, 255, 0.533);
  box-shadow: 4px 4px 4px rgb(0,0,0);
  display: flex;
  flex-direction: column;
  margin: 10px;
  min-width: 300px;
  position: relative;
  text-shadow: 2px 2px 2px #000;
  width: 300px;
`;

const ListContainer = styled.div`
  box-shadow: 0 0 15px #26d4cc,
    0 0 10px #26d4cc,
    0 0 5px #26d4cc,
    0 0 2px #26d4cc,
    inset 0 0 10px 0 #26d4cc;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 8px;
  padding-top: 136px;
  transition: all .2s ease-in-out;
`;

const SubjectHeader = styled.div`
  position: absolute;
  top: 30px;
  width: 100%;
`;

const Heading3 = styled.div`
  font-family: ${props => props.theme.hTypeface};
  font-size: 2.4rem;
  margin: 5px 0 8px 0;
  padding: 0 8px;
  text-align: center;
`;

const Paragraph = styled.p`
  border-top: 1px solid ${props => props.theme.mainColor};
  color: ${props => props.theme.mainColor};
  font-size: 1.3rem;
  margin: 0 10px;
  min-height: 75px;
  padding: 8px;
  text-align: center;
`;

const ItemContainer = styled.div`
  background: rgba(22, 136, 130, 0.337);
  border-left: 1px solid rgb(18, 110, 106);
  border-top: 1px solid rgb(22, 136, 130);
  border-radius: 5px;
  box-shadow: 2px 2px 4px rgb(0,0,0);
  color: rgb(255,255,255);
  margin-bottom: 8px;
  padding: 20px;
  position: relative;
  transition: background-color .2s ease-in-out;
  width: 100%;
  h4 {
    font-family: ${props => props.theme.hTypeface};
    font-size: 1.75rem;
    padding-bottom: 4px;
    word-wrap: break-word;
  }
  p {
    font-size: 1.25rem;
    line-height: 1.2;
    padding-left: 12px;
  }
`;

export class DragonNestFake extends Component {
  render() {
    const { subject, texts } = this.props;
    return (
      <ColumnContainer>
        <ColumnButtons
          disabled={true}
          id={subject._id}
          index={subject._id}
          subject={subject}
        />

        <SubjectHeader>
          <Heading3>{subject.subject}</Heading3>
          <Paragraph>{subject.theme}</Paragraph>
        </SubjectHeader>

        <ListContainer>
          {texts.map((text, index) => (
            <ItemContainer key={text._id}>
              <ItemButtons
                disabled={true}
                index={index}
                subject={subject}
                text={text}
              />
              <h4>{text.title}</h4>
              <p>{text.thesis}</p>
            </ItemContainer>
          ))}
        </ListContainer>

      </ColumnContainer>
    )
  }
};