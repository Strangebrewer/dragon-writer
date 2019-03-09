import styled from 'styled-components';

const EditorWrapper = styled.div`
  align-self: center;
  background: #999999;
  border: 1px solid rgba(38, 212, 204, .267);
  box-shadow: inset 0 0 30px 0px rgba(38, 212, 204, 0.267), inset 0 0 40px 5px #000, inset 0 0 20px 1px #000;
  margin: auto;
  padding: 20px 50px 40px 50px;
  position: relative;
  width: 100%;
`;

const EditorStyles = styled.div`
  background: ${props => props.theme.editorBG};
  border: 2px solid rgba(38, 212, 204, .5);
  border-top: 1px solid #999;
  border-top: 1px solid #c4c4c4;
  background: #ffffffa6;
  color: ${props => props.theme.black};
  cursor: text;
  flex-grow: 1;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  height: 35vh;
  overflow: auto;
  padding: 4% 0;
  transition: background-color .2s ease-in-out;
  width: 100%;
  > div:first-child {
    background: white;
    box-shadow: 8px 8px 6px #444;
    width: 80%;
    min-height: 150vh;
    margin: auto;
    padding: 5% 10%;
  }
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
  width: 100%;
  margin: auto;
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
  padding-left: 200px;
  width: calc(100% - 200px);
`;

export {
  EditorWrapper,
  EditorStyles,
  Header,
  MetaDataForm,
  OuterContainer
}