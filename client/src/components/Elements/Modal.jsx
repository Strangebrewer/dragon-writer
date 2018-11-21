import React from "react";
import styled from 'styled-components';

const Outer = styled.div`
  display: flex;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  max-width: 60%;
  min-width: 300px;
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #4e50d8e2;
  box-shadow: 0 0 10px #fff, 0 0 10px #cacaca, 0 0 20px #a3a3a3, 0 0 30px #777777;
  animation-name: fadein;
  animation-duration: 0.4s;
  border-radius: 12px;
  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Button = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  color: #aaa;
  font-size: 20px;
  outline: transparent;
  background-color: transparent;
  border: none;
  &:hover, &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Body = styled.div`
  max-width: 100%;
  margin: auto;
  padding: 40px 30px 30px 30px;
  z-index: 999;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  button, a {
    font-family: var(--font-Raleway);
    font-size: .9rem;
    border: 1px solid #4e50d8e2;
    padding: 7px 14px;
    margin-top: 20px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 0 20px 20px #4e50d8e2 inset, 0 0 0 0 #4e50d8e2;
	  transition: all 150ms ease-in-out;
	  text-decoration: none;
  }
  button:hover, a:hover {
    background-color: #fff;
    box-shadow: 0 0 5px #4e50d8e2 inset, 0 0 5px #4e50d8e2;
    color: #4e50d8e2;
  }
`;

const Modal = props => (
  <React.Fragment>
    {props.show
      ? (
        <Outer className="modal" id="modal" onClick={props.outsideClick}>
          <Content className="modal-content">
            <Button className="modal-close" onClick={props.closeModal}>&times;</Button>
            <Body className="modal-body">
              {props.body}
              <Buttons className="modal-btn-div">
                {props.buttons}
              </Buttons>
            </Body>
          </Content>
        </Outer>
      )
      : null}
  </React.Fragment>
);

export default Modal;