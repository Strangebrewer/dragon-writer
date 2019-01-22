import React, { Component } from "react";
import styled from 'styled-components';

const Outer = styled.div`
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
  background: linear-gradient(rgba(38, 212, 204, 0.267), rgba(38, 212, 204, 0.267)),
    linear-gradient(rgb(0,0,0), rgb(0,0,0));
  border: 1px solid rgb(38, 212, 204);
  border-radius: 12px;
  box-shadow: 0 0 1px #000,
    0 0 2px #000,
    0 0 4px #000,
    0 0 8px #111,
    0 0 10px #111,
    0 0 20px #222,
    0 0 40px #aaa,
    inset 0 0 100px 30px rgb(0,0,0);
  font-size: 1.8rem;
  max-width: 60%;
  min-width: 300px;
  margin: auto;
  padding: 0;
  position: relative;
  img {
    border: 1px solid black;
  }
  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #1d928c;
  font-size: 20px;
  outline: transparent;
  position: absolute;
  top: 5px;
  right: 5px;
  &:hover, &:focus {
    color: #26d4cc;
    cursor: pointer;
    text-decoration: none;
  }
`;

const Body = styled.div`
  margin: auto;
  max-width: 100%;
  padding: 50px 40px 40px 40px;
  z-index: 999;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  button, a {
    background-color: #1d928c;
    border: none;
    border-radius: 5px;
    color: #fff;
    display: ${props => props.center ? 'block' : 'inline'};
    font-size: ${props => props.full && '1.8rem'};
    height: ${props => props.full && '40px'};
    margin: 10px auto 0 auto;
    outline: transparent;
    padding: 8px 12px;
    text-shadow: 0 0 5px #000;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    width: ${props => props.full && '100%'};
  }
  button:hover, a:hover {
    background-color: #26d4cc;
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
    if (event.target.className.includes("modal"))
      this.closeModal();
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isOpen &&
          <Outer className="modal" onClick={this.outsideClick}>
            <Content style={this.state.style}>
              <Button onClick={this.closeModal}>&times;</Button>
              <Body>
                {this.state.body}
                <Buttons>
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