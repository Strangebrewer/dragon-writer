import styled from "styled-components";

export const EditorStyles = styled.div`
  border-radius: 8px;
  border: ${props => (
    props.mode === "write"
      ? "2px solid " + props.theme.links
      : "none"
  )};
  margin-left: ${props => props.inline && '160px'};
  background: ${props => (
    props.mode === "write"
      ? props.theme.editorBG
      : props.isDragging
        ? props.theme.pageBGLite
        : 'transparent'
  )};
  transition: background-color .2s ease-in-out;
  line-height: 1.4;
  font-family: Arial, Helvetica, sans-serif;
  color: ${props => (
    props.mode === "write"
      ? props.theme.black
      : props.theme.editorColor
  )};
  p {
    text-indent: 25px;
    font-size: 2.3rem;
  }
  box-shadow: ${props => (
    props.mode === "write"
      ? props.theme.fieldShadow
      : "none"
  )};
`;