import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import { LinkBtn, Page } from '../components/PageElements';
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
  position: relative;
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

const Textarea = styled.textarea`
  position: absolute;
  top: 0;
  opacity: 0;
  border: 1px solid red;
`;

const Buttons = styled.div`
  background: linear-gradient(#00000000, #ffffff85);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px 10px 10px;
  opacity: 0.15;
  transition: opacity .25s ease-in-out;
  &:hover {
    opacity: 1;
  }
  h2 {
    font-size: 1.4rem;
    margin: 15px 0;
    text-align: center;
    width: 100%;
  }
  button {
    background: rgba(22, 136, 130, 0.4);
    border: none;
    border-left: 1px solid rgb(18, 110, 106);
    border-top: 1px solid rgb(22, 136, 130);
    box-shadow: 2px 2px 4px rgb(0,0,0);
    color: rgb(255,255,255);

    outline: transparent;
    font-family: ${props => props.theme.typeface};
    cursor: pointer;
  }
  h2, button {
    text-shadow: 0 0 1px #000,
      0 0 2px #000,
      0 0 3px #000,
      0 0 4px #000,
      0 0 5px #000,
      0 0 10px #000;
  }
`;

function Images(props) {

  const [file, setFile] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const headers = buildHeaders();
    API.getImages(headers)
      .then(res => setImages(res.data.images))
      .catch(err => console.log(err));
  }, []);

  const buildHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
  }

  const uploadImage = async event => {
    const files = event.target.files;
    if (!files[0].type.includes('image')) return;
    const newFile = new FormData();
    await newFile.append('file', files[0]);
    await newFile.append('upload_preset', 'dragon-writer');
    setFile(newFile);
  };

  const saveImage = async ({ setModal, closeModal }) => {
    if (!file) {
      setTimeout(() => setModal({
        body: <p style={{ textAlign: "center" }}>Images only, please.</p>,
        buttons: <Button onClick={closeModal}>Close</Button>
      }), 500)
      return;
    }
    setLoading(true);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload/`, {
      method: 'POST',
      body: file
    });
    const jsonFile = await res.json();
    const imageObject = {
      image: jsonFile.secure_url,
      largeImage: jsonFile.eager[0].secure_url,
      midImage: jsonFile.eager[1].secure_url,
      thumbnail: jsonFile.eager[2].secure_url,
      publicId: jsonFile.public_id,
    };
    const headers = buildHeaders();
    const response = await API.saveImage(imageObject, headers);
    setLoading(false);
    setImages(response.data.user.images);
  };

  const copyToClipboard = id => {
    const el = document.getElementById(id);
    el.focus();
    el.select();
    document.execCommand('copy');
  }

  const goBack = props.history.goBack;

  return (
    <ModalLogic>
      {modalProps => (
        <Page
          authenticated={props.authenticated}
          logout={props.logout}
          user={props.user}
        >
          <div style={{ textAlign: 'center' }}><LinkBtn onClick={() => goBack()}>Go back</LinkBtn></div>
          {!loading && (
            <div style={{ width: '300px', margin: '100px auto' }}>
              <Label htmlFor="file">Select Image:</Label>
              <Input
                type="file"
                id="file"
                name="file"
                onChange={uploadImage}
                placeholder="upload an image"
              />
              <Button onClick={() => saveImage(modalProps)}>
                Submit
              </Button>
            </div>
          )}
          <ImageWrapper>
            {images.map(image => {
              return (
                <ImageContainer key={image._id}>
                  <Textarea id={`${image._id}-large`} defaultValue={image.largeImage} />
                  <Textarea id={`${image._id}-mid`} defaultValue={image.midImage} />
                  <Textarea id={`${image._id}-thumb`} defaultValue={image.thumbnail} />
                  <Textarea id={`${image._id}-all`} defaultValue={image._id} />
                  <img src={image.midImage} alt="" />
                  <Buttons>
                    <h2>copy to clipboard:</h2>
                    <button onClick={() => copyToClipboard(`${image._id}-mid`)} >medium</button>
                    <button onClick={() => copyToClipboard(`${image._id}-large`)} >large</button>
                    <button onClick={() => copyToClipboard(`${image._id}-thumb`)} >thumbnail</button>
                    <button onClick={() => copyToClipboard(`${image._id}-all`)} >for text</button>
                  </Buttons>
                </ImageContainer>
              )
            })}
          </ImageWrapper>
        </Page>
      )}
    </ModalLogic >
  )
}

export default Images;