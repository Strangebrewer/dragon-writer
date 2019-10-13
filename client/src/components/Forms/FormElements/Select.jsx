import React from "react";
import styled from "styled-components";

const Dropdown = styled.select`
   background-color: ${props => props.theme.fieldBG};
   border: 2px solid ${props => props.theme.links};
   border-radius: 5px;
   box-shadow: ${props => props.theme.fieldShadow};
   color: ${props => props.theme.fieldColor};
   display: block;
   margin-bottom: 5px;
   outline: transparent;
   padding: 5px;
`;

export const Select = props => (
   <Dropdown {...props}>{props.children}</Dropdown>
);