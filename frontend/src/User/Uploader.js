import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const Uploader = (props) => {

  console.log(props.fileList);

  const onChange = ({ fileList: newFileList }) => {
    props.setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="http://localhost:9999/api/upload"
        listType="picture-card"
        fileList={props.fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {props.fileList.length < 2 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default Uploader;