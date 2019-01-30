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
    if (!files[0].type.includes('image')) return;
    const data = new FormData();
    await data.append('file', files[0]);
    await data.append('upload_preset', 'dragon-writer');
    this.setState({ data });
  };

  saveImage = async id => {
    if (!this.state.data) {
      this.props.closeModal();
      setTimeout(() => this.props.setModal({
        body: <p style={{ textAlign: "center" }}>Images only, please.</p>,
        buttons: <Button onClick={this.props.closeModal}>Close</Button>
      }), 500)
      return;
    }
    this.setState({ loading: true });
    this.props.closeModal();
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`, {
      method: 'POST',
      body: this.state.data
    });
    const file = await res.json();
    const updateObject = {
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      publicId: file.public_id,
    };
    switch (this.props.type) {
      case 'project':
        await API.updateProject(id, updateObject);
        this.props.refreshProjectList();
        break;
      case 'subject':
        const subject = await API.updateSubject(id, updateObject);
        this.props.addImageToSubject(subject.data);
        break;
      default:
        const text = await API.updateText(id, updateObject);
        this.props.addImageToText(text.data)
    }
    this.setState({ loading: false });
  };

  deleteImageModal = (textId, imageId) => {
    this.props.setModal({
      body: <p>Are you sure you want to delete this image? This is permenent.</p>,
      buttons: (
        <div>
          <Button onClick={() => this.deleteImage(textId, imageId)}>
            Yes, delete it
          </Button>
          <Button onClick={this.props.closeModal}>
            Cancel
          </Button>
        </div>
      )
    })
  };

  deleteImage = async (id, imageId) => {
    await this.setState({ loading: true });
    this.props.closeModal();

    const deleteObj = { imageId };
    switch (this.props.type) {
      case 'project':
        deleteObj.type = 'Project'
        await API.removeImage(id, deleteObj);
        this.props.refreshProjectList();
        break;
      case 'subject':
        deleteObj.type = 'Subject'
        const result = await API.removeImage(id, deleteObj);
        this.props.addImageToSubject(result.data);
        break;
      default:
        deleteObj.type = 'Text'
        const text = await API.removeImage(id, deleteObj);
        this.props.addImageToText(text.data)
    }
    this.setState({ loading: false });
  };

  uploadImageModal = id => {
    this.props.setModal({
      body: (
        <Fragment>
          <Label htmlFor="file">Select Image:</Label>
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
        <div>
          <Button
            disabled={this.state.loading}
            onClick={() => this.saveImage(id)}
          >
            Submit
          </Button>
          <Button onClick={this.props.closeModal}>
            Cancel
          </Button>
        </div>
      )
    })
  };

  imageModal = (image, imageId, id, type) => {
    let body;
    if (!image) body = <p>There is no image associated with this {type}.</p>;
    else body = <img src={image} alt="nothing" style={{ maxWidth: '100%', maxHeight: '75vh' }} />;
    this.props.setModal({
      body,
      buttons: (
        <div>
          {image &&
            <Button
              disabled={this.state.loading}
              onClick={() => this.deleteImageModal(id, imageId)}
            >
              Delete
            </Button>
          }
          <Button onClick={this.props.closeModal}>
            Close
          </Button>
        </div>
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