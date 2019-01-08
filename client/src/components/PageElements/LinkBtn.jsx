import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  /* color: ${props => props.black ? props.theme.black : props.theme.mainColor}; */
  color: ${props => props.color ? props.color : props.theme.mainColor};
  display: ${props => props.block ? 'block' : 'inline'};
  font-family: ${props => props.fancy ? props.theme.typeface : 'default'};
  font-size: ${props => props.size ? props.size : '1.3rem'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  line-height: ${props => props.lineHeight};
  margin: ${props => props.margin};
  outline: transparent;
  padding: ${props => props.padding};
  position: ${props => props.position ? props.position : "relative"};
    top: ${props => props.top};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
    right: ${props => props.right};
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  z-index: 9;
  &:hover, &:focus {
    color: ${props => (
      props.delete
        ? props.theme.deleteLinkHover
        : props.theme.linkHover
    )};
  }
  &:disabled {
    cursor: default;
    opacity: ${props => (
      props.storyboard
        ? 0.1
        : 0.6
    )};
  }
  &:disabled:hover {
    color: inherit;
  }
`;


export const LinkBtn = props => {
  return (
    <Button {...props}>{props.children}</Button>
  )
};