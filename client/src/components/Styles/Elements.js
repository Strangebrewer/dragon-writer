import styled from "styled-components";

const Spinner = styled.span`
  -webkit-animation: spinner 400ms linear infinite;
  animation: spinner 400ms linear infinite;
  border: solid ${props => props.storyboard ? '5px' : '2px'} transparent;
  border-left-color: ${props => props.black ? props.theme.black : props.theme.mainColor};
  border-top-color: ${props => props.black ? props.theme.black : props.theme.mainColor};
  border-radius: 50%;
  height: ${props => props.size};
  margin: ${props => props.margin};
  position: absolute;
  top: ${props => props.top};
  right: ${props => props.right};
  left: ${props => props.left};
  bottom: ${props => props.bottom};
  width: ${props => props.size};
  @-webkit-keyframes spinner {
    0%   { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export {
  Spinner,
}