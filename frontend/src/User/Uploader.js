import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const Uploader = (props) => {

  const [fileList,] = useState([])

  const onFileListChange = (e) => {
    return "http://localhost:9999/api/cur_user/avatar/update"
  };

  return (
    <ImgCrop 
      rotate
      shape = 'round'
    >
      <Upload
        action = {onFileListChange}
        withCredentials = {true}
        listType="picture-card"
        fileList={fileList}
        onChange = {props.hideUploadModal}
      >
        {fileList.length < 2 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default Uploader;