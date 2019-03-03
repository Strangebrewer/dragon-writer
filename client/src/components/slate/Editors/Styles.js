import styled from 'styled-components';

const EditorInner = styled.div`
  margin: auto;
  max-width: 1000px;
  width: 100%;
`;

const EditorOuter = styled.div`
  align-self: center;
  background: #999999dd;
  border: 3px solid rgba(38, 212, 204, .267);
  box-shadow: inset 0 0 30px 0px rgba(38, 212, 204, 0.267), inset 0 0 40px 5px #000, inset 0 0 20px 1px #000;
  margin: auto;
  max-width: 1100px;
  padding: 20px 40px;
  position: relative;
  width: 100%;
`;

const EditorStyles = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid rgba(38, 212, 204, .5);
  border-radius: 6px;
  box-shadow: ${props => props.theme.fieldShadow};
  color: ${props => props.theme.black};
  cursor: text;
  flex-grow: 1;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  max-width: 1000px;
  min-height: 35vh;
  overflow: auto;
  padding: 10px;
  transition: background-color .2s ease-in-out;
  width: 100%;
  p {
    font-size: 1.5rem;
    text-indent: 25px;
  }
  ul {
    margin-top: 0;
    padding-top: 0;
  }
`;

const Header = styled.div`
  color: #fff;
  font-family: ${props => props.theme.hTypeface};
  font-size: 4rem;
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 0 2px #000, 0 0 3px #111, 0 0 10px rgba(38, 212, 204, .7);
`;

const MetaDataForm = styled.div`
  display: flex;
  position: inherit;
  div {
    width: 33.3%;
    padding: 0 10px;
  }
  div:first-child {
    padding: 0 20px 0 0;
  }
  div:nth-child(3) {
    padding: 0 0 0 20px;
  }
  label {
    color: #fff;
    text-shadow: 0 0 2px #000, 0 0 3px #111, 0 0 10px rgba(38, 212, 204, .7);
  }
  input, select {
    border-color: rgba(38, 212, 204, .6);
    width: 100%;
  }
`;

const OuterContainer = styled.div`
  background: transparent;
  display: flex;
  height: 100%;
  width: calc(100% - 200px);
`;

export {
  EditorInner,
  EditorOuter,
  EditorStyles,
  Header,
  MetaDataForm,
  OuterContainer
}