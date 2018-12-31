import React, { Component } from "react";
import styled from 'styled-components';

const Outer = styled.div`
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  height: 100%;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
`;

const Content = styled.div`
  animation-duration: 0.4s;
  animation-name: fadein;
  background-color: ${props => props.theme.modalBG};
  border: 1px solid ${props => props.theme.links};
  border-radius: 12px;
  box-shadow: 0 0 10px #fff, 0 0 10px #cacaca, 0 0 20px #a3a3a3, 0 0 30px #777777;
  color: ${props => props.theme.modalColor};
  font-size: 1.8rem;
  font-weight: bold;
  max-width: 60%;
  min-width: 300px;
  margin: auto;
  padding: 0;
  position: relative;
  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.buttonBG};
  font-size: 20px;
  outline: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
  &:hover, &:focus {
    color: black;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Body = styled.div`
  margin: auto;
  max-width: 100%;
  padding: 40px 30px 30px 30px;
  z-index: 999;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  button, a {
    border: 1px solid ${props => props.theme.buttonBG};
    border-radius: 5px;
    box-shadow: 0 0 20px 20px ${props => props.theme.buttonBG} inset,
      0 0 0 0 ${props => props.theme.buttonBG};
    color: #fff;
    cursor: pointer;
    font-size: 1.8rem;
    margin-top: 20px;
    padding: 7px 14px;
	  text-decoration: none;
	  transition: all 150ms ease-in-out;
  }
  button:hover, a:hover {
    background-color: ${props => props.theme.buttonHoverBG};
    box-shadow: 0 0 5px ${props => props.theme.buttonBG} inset, 0 0 5px ${props => props.theme.buttonBG};
    color: ${props => props.theme.buttonHoverColor};
  }
`;

export class ModalLogic extends Component {
  state = {
    isOpen: false,
    body: "",
    buttons: "",
    style: {}
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  setModal = modalInput => {
    this.setState({
      isOpen: true,
      body: modalInput.body,
      buttons: modalInput.buttons,
      style: modalInput.style
    });
  };

  outsideClick = event => {
    // the space in this is necessary because the outer div is the only one that will have a space after 'modal' in the classname.
    if (event.target.className.includes("modal "))
      this.closeModal();
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isOpen &&
          <Outer className="modal" id="modal" onClick={this.outsideClick}>
            <Content className="modal-content" style={this.state.style}>
              <Button className="modal-close" onClick={this.closeModal}>&times;</Button>
              <Body className="modal-body">
                {this.state.body}
                <Buttons className="modal-btn-div">
                  {this.state.buttons}
                </Buttons>
              </Body>
            </Content>
          </Outer>
        }
        {this.props.children({
          closeModal: this.closeModal,
          setModal: this.setModal
        })}
      </React.Fragment>
    )
  }
}