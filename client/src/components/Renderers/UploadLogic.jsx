import React, { Component, Fragment } from 'react';
import { Button, Input, Label } from "../Forms/FormElements";
import { API } from "../../utils";

export class UploadLogic extends Component {
  state = {
    image: '',
    largeImage: '',
    publicId: '',
    data: '',
    loading: false,
  }

  uploadImage = async event => {
    const files = event.target.files;
    const data = new FormData();
    await data.append('file', files[0]);
    await data.append('upload_preset', 'dragon-writer');
    this.setState({ data });
  };

  saveImage = async id => {
    this.setState({ loading: true });
    this.props.closeModal();
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
    this.props.getInitialData(this.props.user);
    this.setState({ loading: false });
  };

  uploadImageModal = id => {
    console.log(id);
    this.props.setModal({
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
          <Button onClick={this.props.closeModal}>Cancel</Button>
        </Fragment>
      )
    })
  };

  deleteImage = async (projectId, imageId) => {
    await this.setState({ loading: true });
    this.props.closeModal();
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
    await this.props.getInitialData(this.props.user);
    this.setState({ loading: false });
  };

  imageModal = (image, imageId, projectId) => {
    console.log(image);
    console.log(imageId);
    this.props.setModal({
      body: <img src={image} alt="nothing" />,
      buttons: (
        <Fragment>
          <Button
            disabled={this.state.loading}
            onClick={() => this.deleteImage(projectId, imageId)}>Delete</Button>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Fragment>
      )
    });
  };

  render() {
    return (
      this.props.children({
        imageModal: this.imageModal,
        loading: this.state.loading,
        state: this.state,
        uploadImageModal: this.uploadImageModal,
      })
    );
  }
}