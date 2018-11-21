import React, { Component } from 'react';
import styled from 'styled-components';
import Page from "../components/Elements/Page";
import TextEditor from "../components/TextEditor";
import Modal from "../components/Elements/Modal";

const Container = styled.div`
  padding-right: 200px;
  max-width: 1150px;
  margin: auto;
`;

class Editor extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    url: ''
  };

  // Standard input change controller
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // MODAL TOGGLE FUNCTIONS
  closeModal = () => {
    this.setState({
      modal: { isOpen: false }
    });
  };

  setModal = modalInput => {
    this.setState({
      modal: {
        isOpen: true,
        body: modalInput.body,
        buttons: modalInput.buttons
      }
    });
  };

  outsideClick = event => {
    if (event.target.className === "modal")
      this.closeModal();
  };

  render() {
    console.log(this.props.location);
    return (
      <Page
        title="Editor Page!"
        authenticated={this.props.authenticated}
        logout={this.props.logout}
        user={this.props.user}
      >
        <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
          outsideClick={this.outsideClick}
        />
        <Container>
          <TextEditor
            getProjects={this.props.getProjects}
            getSubjects={this.props.getSubjects}
            getInitialData={this.props.getInitialData}
            state={this.props.location.state}
          />
        </Container>
      </Page>
    );
  }
}

export default Editor;