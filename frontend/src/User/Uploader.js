import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PresetColorTypes } from 'antd/lib/_util/colors';
import backendURL from '../Services/backendURL';

var imgUrlBase64 = [];

const Uploader = (props) => {

  const [fileList,] = useState([])

  const onFileListChange = (e) => {
    return backendURL + "/api/cur_user/avatar/update"
  };

  return (
    <ImgCrop 
      rotate
      shape = 'round'
    >
      <Upload
        action = "https://petpal-cpsc455.herokuapp.com/api/cur_user/avatar/update"
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
