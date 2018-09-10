import React, { Component } from 'react';
import ReactS3Uploader from 'react-s3-uploader';

import S3Image from '../s3-image/S3Image';

import styles from './FileUploader.css';

class FileUpload extends Component {
  state = {
    error: '',
    image: '',
    uploadProgress: 0,
  };

  onUploadError = (res) => {
    this.setState({
      error: res,
    });
  };

  onUploadFinish = (res) => {
    this.props.onChange(res);
    this.setState({
      image: res.fileKey,
    });
  };

  onUploadProgress = (percent) => {
    this.setState({
      uploadProgress: percent,
    });
  };

  render() {
    const { state } = this;
    const isPdf = state.image.indexOf('.pdf') > 0;
    const showUploading =
      state.uploadProgress > 0 && state.uploadProgress < 100;

    return (
      <div>
        <ReactS3Uploader
          signingUrl="/s3uploader/"
          signingUrlMethod="GET"
          accept="image/*,application/pdf"
          s3path=""
          onProgress={this.onUploadProgress}
          onError={this.onUploadError}
          onFinish={this.onUploadFinish}
          contentDisposition="auto"
          scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/gi, '')}
          server={`${process.env.REACT_APP_API_HOST}:${
            process.env.REACT_APP_API_PORT
          }`}
          inputRef={(cmp) => (this.uploadInput = cmp)}
          autoUpload={true}
        />
        {state.error && <span>{state.error}</span>}
        {showUploading > 0 && <span>Uploading: {state.uploadProgress} %</span>}
        {state.image &&
          !isPdf && (
            <S3Image fileName={state.image} className={styles.PreviewImage} />
          )}
      </div>
    );
  }
}

export default FileUpload;
