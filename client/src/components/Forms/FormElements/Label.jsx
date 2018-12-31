import React from 'react';
import styled from "styled-components";

const FormLabel = styled.label`
  display: block;
  font-size: 1.7rem;
  padding: 10px 0 5px 0;
  /* font-weight: bold; */
`;

export const Label = props => (
  <FormLabel {...props}>{props.children}</FormLabel>
);