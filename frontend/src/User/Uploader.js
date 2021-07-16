import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

var imgUrlBase64 = [];

const Uploader = (props) => {

  const [fileList, setFileList] = useState([])

  const onFileListChange = (e) => {
    console.log(e)
    //setFileList(newFileList);
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
      >
        {fileList.length < 2 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default Uploader;