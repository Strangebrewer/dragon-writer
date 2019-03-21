import React, { Component } from 'react';
import styled from 'styled-components';
import { Page } from '../components/PageElements';
import { ModalLogic } from '../components/Renderers';
import { Button, Input, Label } from '../components/Forms/FormElements';
import { API } from '../utils';

const ImageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 320px;
  width: 320px;
  padding: 10px;
  background: black;
  margin: 20px;
  border: 1px solid red;
  img {
    max-height: 100%;
    max-width: 100%;
    align-self: center;
    margin: auto;
  }
`;

class Images extends Component {
  state = {
    file: '',
    images: [],
    loading: false
  }

  async componentDidMount() {
    const headers = this.buildHeaders();
    const res = await API.getImages(headers);
    this.setState({ images: res.data.images })
  }

  buildHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
  }

  uploadImage = async event => {
    const files = event.target.files;
    if (!files[0].type.includes('image')) return;
    const file = new FormData();
    await file.append('file', files[0]);
    await file.append('upload_preset', 'dragon-writer');
    this.setState({ file });
  };

  saveImage = async ({ setModal, closeModal }) => {
    if (!this.state.file) {
      setTimeout(() => setModal({
        body: <p style={{ textAlign: "center" }}>Images only, please.</p>,
        buttons: <Button onClick={closeModal}>Close</Button>
      }), 500)
      return;
    }
    this.setState({ loading: true });
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`, {
      method: 'POST',
      body: this.state.file
    });
    const file = await res.json();
    console.log(file);
    const imageObject = {
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
      midImage: file.eager[1].secure_url,
      thumbnail: file.eager[2].secure_url,
      publicId: file.public_id,
    };
    const headers = this.buildHeaders();
    const user = await API.saveImage(imageObject, headers);
    this.setState({ loading: false, images: user.data.images });
  };

  render() {
    const { images, loading } = this.state;
    return (
      <ModalLogic>
        {modalProps => (
          <Page>
            {!loading && (
              <div style={{ width: '300px', margin: '100px auto' }}>
                <Label htmlFor="file">Select Image:</Label>
                <Input
                  type="file"
                  id="file"
                  name="file"
                  onChange={this.uploadImage}
                  placeholder="upload an image"
                />
                <Button onClick={() => this.saveImage(modalProps)}>
                  Submit
              </Button>
              </div>
            )}
            <ImageWrapper>
              {console.log(images)}
              {images && images.map(image => (
                <ImageContainer>
                  <img key={image._id} src={image.midImage} alt="" />
                </ImageContainer>
              ))}
            </ImageWrapper>
          </Page>
        )}
      </ModalLogic >
    )
  }

}

export default Images;