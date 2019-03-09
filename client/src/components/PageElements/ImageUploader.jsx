import React, { PureComponent } from 'react';
import { ModalLogic, UploadLogic } from "../Renderers";

export class ImageUploader extends PureComponent {
  render() {
    return (
      <ModalLogic>
        {modalprops => (
          <UploadLogic {...this.props} {...modalprops}>
            {uploadprops => (
              this.props.children({
                ...modalprops,
                ...uploadprops
              })
            )}
          </UploadLogic>
        )}
      </ModalLogic>
    );
  }
};