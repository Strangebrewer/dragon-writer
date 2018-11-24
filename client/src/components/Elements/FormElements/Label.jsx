import React, { Component } from 'react';
import styled from "styled-components";

const FormLabel = styled.label`
  display: block;
  padding: 10px 0 5px 0;
  font-weight: bold;
  font-size: 1.7rem;
`;

export const Label = props => (
  <FormLabel {...props}>{props.children}</FormLabel>
);