import React, { Component, Fragment } from 'react';
import { Modal } from "../PageElements";
import { Button, Input, Label } from "./FormElements";
import { API } from "../../utils";

export class UploadLogic extends Component {
  state = {
    modal: {
      isOpen: false,
      body: "",
      buttons: ""
    },
    image: '',
    largeImage: '',
    publicId: '',
    data: '',
  };

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
    // the space in this is necessary because the outer div is the only one that will have a space after 'modal' in the classname.
    if (event.target.className.includes("modal "))
      this.closeModal();
  };

  uploadImage = async event => {
    const files = event.target.files;
    const data = new FormData();
    await data.append('file', files[0]);
    await data.append('upload_preset', 'dragon-writer');
    this.setState({ data });
  };

  saveImage = async id => {
    const res = await fetch('https://api.cloudinary.com/v1_1/dm6eoegii/image/upload/', {
      method: 'POST',
      body: this.state.data
    });
    const file = await res.json();
    console.log(file);
    const updateObject = {
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      publicId: file.public_id,
    };
    let result;
    switch (this.props.type) {
      case 'project':
        result = await API.updateProject(id, updateObject);
        break;
      case 'subject':
        result = await API.updateSubject(id, updateObject);
        break;
      default:
        result = await API.updateText(id, updateObject);
    }
    console.log(result);
    this.props.getInitialData(this.props.user)
    this.closeModal();
  };

  uploadImageModal = id => {
    console.log(id);
    this.setModal({
      body: (
        <Fragment>
          <Label htmlFor="file">Image:</Label>
          <Input
            type="file"
            id="file"
            name="file"
            onChange={this.uploadImage}
            placeholder="upload an image"
          />
        </Fragment>
      ),
      buttons: (
        <Fragment>
          <Button
            disabled={this.state.loading}
            onClick={() => this.saveImage(id)}
          >
            Submit
          </Button>
          <Button onClick={this.closeModal}>Cancel</Button>
        </Fragment>
      )
    })
  };

  deleteImage = async (projectId, imageId) => {
    console.log(projectId);
    const deleteObj = { imageId };
    console.log(deleteObj);
    let result;
    switch (this.props.type) {
      case 'project':
        result = await API.removeProjectImage(projectId, deleteObj);
        break;
      case 'subject':
        result = await API.removeSubjectImage(projectId, deleteObj);
        break;
      default:
        result = await API.removeTextImage(projectId, deleteObj);
    }
    console.log(result);
    await this.props.getInitialData(this.props.user);
    this.closeModal();
  };

  imageModal = (image, imageId, projectId) => {
    console.log(image);
    console.log(imageId);
    this.setModal({
      body: <img src={image} alt="nothing" />,
      buttons: (
        <Fragment>
          <Button onClick={() => this.deleteImage(projectId, imageId)}>Delete</Button>
          <Button onClick={this.closeModal}>Close</Button>
        </Fragment>
      )
    })
  };

  render() {
    return (
      <Fragment>
        <Modal
          show={this.state.modal.isOpen}
          closeModal={this.closeModal}
          body={this.state.modal.body}
          buttons={this.state.modal.buttons}
          outsideClick={this.outsideClick}
          loading={this.state.loading}
        />
        {this.props.children({
          imageModal: this.imageModal,
          state: this.state,
          uploadImageModal: this.uploadImageModal,
        })}
      </Fragment>
    );
  }
}