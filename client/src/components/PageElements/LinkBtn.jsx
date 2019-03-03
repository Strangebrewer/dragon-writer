import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.text ? "#26d4cc" : props.theme.mainColor};
  display: ${props => props.block ? 'block' : 'inline'};
  font-family: ${props => props.theme.typeface};
  font-size: ${props => props.size ? props.size : '1.5rem'};
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
  text-shadow: ${props => props.shadow && '2px 2px 2px #000'};
  transition: ${props => props.theme.colorTrans}, text-shadow 0.15s ease-in-out;
  vertical-align: middle;
  z-index: 9;
  &:hover {
    color: ${props => (
      props.delete
        ? props.theme.deleteLinkHover
        : props.text ? "#fff" : "#26d4cc"
    )};
    text-shadow: ${props => props.shadow && '2px 2px 3px #000'};
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