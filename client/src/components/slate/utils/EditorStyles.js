import styled from "styled-components";

export const EditorStyles = styled.div`
  background: ${props => (
    props.mode === "write"
      ? props.theme.editorBG
      : 'transparent'
  )};
  border-radius: 8px;
  border: ${props => (
    props.mode === "write"
      ? "2px solid " + props.theme.links
      : "none"
  )};
  box-shadow: ${props => (
    props.mode === "write"
      ? props.theme.fieldShadow
      : "none"
  )};
  color: ${props => (
    props.mode === "write"
      ? props.theme.black
      : props.print
        ? 'black'
        : props.theme.editorColor
  )};
  font-family: ${props => (
    props.print
      ? "'Times New Roman', Times, serif"
      : "Arial, Helvetica, sans-serif"
  )};
  line-height: 1.4;
  margin-left: ${props => props.inline && '160px'};
  max-height: ${props => props.inline && '70vh'};
  overflow: auto;
  transition: background-color .2s ease-in-out;
  p {
    text-indent: 25px;
    font-size: ${props => (
      props.mode === "write"
        ? "1.5rem"
        : props.print
          ? "1.2rem"
          : "2.2rem"
    )};
    font-family: ${props => (
      props.print
        ? "'Times New Roman', Times, serif"
        : "Arial, Helvetica, sans-serif"
    )};
    margin: 0;
  }
  ul {
    padding-top: 0;
    margin-top: 0;
  }
`;