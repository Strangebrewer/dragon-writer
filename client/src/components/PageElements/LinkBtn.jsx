import React from "react";
import styled from "styled-components";

const Button = styled.button`
  display: ${props => props.block ? 'block' : 'inline'};
  font-family: ${props => props.fancy ? props.theme.typeface : 'default'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  margin: ${props => props.margin};
  position: ${props => props.position ? props.position : "relative"};
  top: ${props => props.top};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  right: ${props => props.right};
  color: ${props => props.black ? props.theme.black : props.theme.links};
  font-size: ${props => props.size ? props.size : '1.3rem'};
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  line-height: ${props => props.lineHeight};
  padding: ${props => props.padding};
  background: transparent;
  outline: transparent;
  border: none;
  cursor: pointer;
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