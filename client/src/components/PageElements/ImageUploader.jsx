import React, { PureComponent } from 'react';
import { ModalLogic, UploadLogic } from "../Renderers";

export class ImageUploader extends PureComponent {
  render() {
    return (
      <ModalLogic>
        {modalProps => (
          <UploadLogic {...this.props} {...modalProps}>
            {uploadProps => (
              this.props.children({
                ...modalProps,
                ...uploadProps
              })
            )}
          </UploadLogic>
        )}
      </ModalLogic>
    );
  }
};