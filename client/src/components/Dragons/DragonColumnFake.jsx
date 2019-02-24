import React, { Component } from 'react';
import { ColumnButtons, ItemButtons } from "./DragonElements";
import { Container, DragonList, SubjectHeader} from "./DragonColumn";
import { TextContainer } from "./DragonText";

export class DragonColumnFake extends Component {
  render() {
    const { subject, texts } = this.props;
    return (
      <Container>
        <ColumnButtons
          disabled={true}
          id={subject._id}
          index={subject._id}
          subject={subject}
        />

        <SubjectHeader>
          <h3>{subject.subject}</h3>
          <p>{subject.theme}</p>
        </SubjectHeader>

        <DragonList isDraggingOver>
          {texts.map((text, index) => (
            <TextContainer key={text._id}>
              <ItemButtons
                disabled={true}
                index={index}
                subject={subject}
                text={text}
              />
              <h4>{text.title}</h4>
              <p>{text.thesis}</p>
            </TextContainer>
          ))}
        </DragonList>
      </Container>
    )
  }
};