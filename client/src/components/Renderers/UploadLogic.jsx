import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Button, Input, Label } from "../Forms/FormElements";
import { API, Utils } from "../../utils";
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions';
import store from '../../store';

const { consoleLoud } = Utils;

class UploadLogic extends Component {
  state = {
    image: '',
    imageId: '',
    largeImage: '',
    publicId: '',
    data: '',
    loading: false,
  }

  buildHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
    // this.setState({ loading: true });
    this.props.toggleLoading({ loading: store.getState().loading });
    this.props.closeModal();
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`, {
      method: 'POST',
      body: this.state.data
    });
    const file = await res.json();
    const headers = this.buildHeaders();
    const response = await API.saveImage(updateObject, headers);
    consoleLoud(response, "IMAGE UPLOADER RESPONSE")
    const updateObject = {
      imageId: response.image._id,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      midImage: file.eager[1].secure_url,
      thumbnail: file.eager[2].secure_url,
      publicId: file.public_id,
    };
    switch (this.props.type) {
      case 'project':
        await API.updateProject(id, updateObject, headers);
        this.props.refreshProjectList();
        break;
      case 'subject':
        const subject = await API.updateSubject(id, updateObject, headers);
        this.props.addImageToSubject(subject.data);
        break;
      case 'text':
        const text = await API.updateText(id, updateObject, headers);
        this.props.addImageToText(text.data);
        break;
      // default:
    }
    // this.setState({ loading: false });
    this.props.toggleLoading(store.getState().loading);
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

  deleteImage = async (id, publicId) => {
    // await this.setState({ loading: true });
    this.props.toggleLoading({ loading: store.getState().loading });
    this.props.closeModal();

    const deleteObj = { publicId };
    const headers = this.buildHeaders();
    switch (this.props.type) {
      case 'project':
        deleteObj.type = 'Project'
        await API.removeImage(id, deleteObj, headers);
        this.props.refreshProjectList();
        break;
      case 'subject':
        deleteObj.type = 'Subject'
        const result = await API.removeImage(id, deleteObj, headers);
        this.props.addImageToSubject(result.data);
        break;
      default:
        deleteObj.type = 'Text'
        const text = await API.removeImage(id, deleteObj, headers);
        this.props.addImageToText(text.data)
    }
    // this.setState({ loading: false });
    this.props.toggleLoading({ loading: store.getState().loading });
  };

  uploadImageModal = id => {
    console.log(id)
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
          <p>or</p>
          <Label>Paste Image ID:</Label>
          <Input
            type="imageId"
            name="imageId"
            // value={this.state.imageId}
            onChange={this.handleInputChange}
          />
        </Fragment>
      ),
      buttons: (
        <div>
          <Button
            disabled={this.props.loading}
            onClick={() => (
              this.state.imageId
                ? this.assignImage(this.state.imageId, id)
                : this.saveImage(id)
            )}
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

  assignImage = async (imageId, id) => {
    // this.setState({ loading: true });
    this.props.toggleLoading({ loading: store.getState().loading });
    this.props.closeModal();
    const headers = this.buildHeaders();
    const res = await API.getImage(imageId, headers);
    const { image, largeImage, midImage, publicId, thumbnail } = res.data;
    const updateObject = { image, largeImage, midImage, publicId, thumbnail };
    switch (this.props.type) {
      case 'project':
        await API.updateProject(id, updateObject, headers);
        this.props.refreshProjectList();
        break;
      case 'subject':
        const subject = await API.updateSubject(id, updateObject, headers);
        this.props.addImageToSubject(subject.data);
        break;
      default:
        const text = await API.updateText(id, updateObject, headers);
        this.props.addImageToText(text.data)
    }
    // this.setState({ loading: false });
    this.props.toggleLoading({ loading: store.getState().loading });
  }

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
              disabled={this.props.loading}
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
        loading: this.props.loading,
        saveImage: this.saveImage,
        state: this.state,
        uploadImage: this.uploadImage,
        uploadImageModal: this.uploadImageModal,
      })
    );
  }
}

function mapStateToProps(state) {
  consoleLoud(state, "STATE in mAPsTATEtOpROPS");
  return {
    ...state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadLogic)