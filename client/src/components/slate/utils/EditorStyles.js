import styled from "styled-components";

export const EditorStyles = styled.div`
  border-radius: 8px;
  border: ${props => (
    props.mode === "write"
      ? "2px solid " + props.theme.links
      : "none"
  )};
  max-height: ${props => props.inline && '70vh'};
  overflow: auto;
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
    font-size: ${props => (
      props.mode === "write"
        ? "1.5rem"
        : "2.2rem"
    )};
  }
  ul {
    padding-top: 0;
    margin-top: 0;
  }
  box-shadow: ${props => (
    props.mode === "write"
      ? props.theme.fieldShadow
      : "none"
  )};
`;