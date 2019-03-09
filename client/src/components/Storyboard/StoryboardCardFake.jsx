import React, { PureComponent } from 'react';
import { Card } from "./StoryboardCard";

const addedStyles = {
  boxShadow: `0 0 1px #26d4cc,
  0 0 2px #26d4cc,
  0 0 3px #26d4cc,
  0 0 4px #26d4cc,
  0 0 5px #26d4cc,
  0 0 10px #26d4cc,
  0 0 20px #26d4cc`,
  minWidth: '260px',
  minHeight: '260px',
  margin: '94px 20px 0 40px'
}

export const StoryboardCardFake = props => {
  const { image, thesis, title } = props.text;
  return (
    <Card image={image} style={addedStyles}>
      <h3>{title}</h3>
      <p>{thesis}</p>
      {image && <img src={image} />}
    </Card>
  );
};