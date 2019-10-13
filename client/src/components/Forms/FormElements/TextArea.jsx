import React from "react";
import styled from "styled-components";

const TextField = styled.textarea`
   background-color: ${props => props.theme.fieldBG};
   border: 2px solid ${props => props.theme.links};
   border-radius: 5px;
   box-shadow: ${props => props.theme.fieldShadow};
   color: ${props => props.theme.fieldColor};
   display: block;
   padding: 5px;
   margin-bottom: 5px;
   max-width: 100%;
   min-width: 100%;
`;

export const TextArea = props => (
   <TextField {...props} />
);