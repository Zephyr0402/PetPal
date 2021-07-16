import {Avatar, Descriptions, Rate, Card, Button, Input, Image, Skeleton } from 'antd';
import React, {useState, useEffect } from 'react';
import { getUserInfo, updateUserInfo } from '../Services/userService'
import './UserInfoPage.css'
import Modal from 'antd/lib/modal/Modal';
import Form from 'antd/lib/form/Form';
import Uploader from './Uploader';
import CommentCollection from '../AnimalCard/Comments';

function UserInfo(){
    const [uuid, setUUid] = useState("");
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputPNumber, setInputPNumber] = useState('');
    const [inputMail, setInputMail] = useState('');
    const [inputCity, setInputCity] = useState('');
    const [inputIntro, setInputIntro] = useState('');
    const [avatar, setAvatar] = useState('')
    const [upload, showUpload] = useState(false)
    const [comment, showComment] = useState(false)

    useEffect(async () => {
      getUserInfo()
        .then((res) => {
          setUUid(res.uuid);
          setInputName(res.name);
          setInputPNumber(res.phone);
          setInputMail(res.email);
          setInputCity(res.city);
          setInputIntro(res.intro);
          setAvatar(res.avatar);
          showComment(true);
        })
    }, [update]);

    const inputChangeName = (e) => {
      setInputName(e.target.value);
    }

    const inputChangePNumber = (e) => {
      setInputPNumber(e.target.value);
    }

    const inputChangeMail = (e) => {
      setInputMail(e.target.value);
    }

    const inputChangeCity = (e) => {
      setInputCity(e.target.value);
    }

    const inputChangeIntro = (e) => {
      setInputIntro(e.target.value);
    }

    const enableEdit = () => {
      setEdit(!edit);
      console.log(edit);
      if (edit) {
        const userInfoUpdated = {
          inputName,
          inputPNumber,
          inputMail,
          inputCity,
          inputIntro,
        }
        console.log(userInfoUpdated);
        updateUserInfo(userInfoUpdated)
          .then( () => {
            setUpdate(!update);
            console.log("User info has updated");
          })
      }
    };

    const createButton = () => {
      return(
        <Button type="dashed" style={{float: "right"}} onClick={enableEdit}> 
          {edit? "FINISH": "EDIT"}
        </Button>
      );
    };
        
    return(
        <div style = {{height:'100%', overflow :'auto'}}>
          <div className="avatar" >
              <Avatar  
                size={64}
                src = {<Image 
                        src = {avatar} 
                        height = {64} 
                        width = {64}
                        preview = {false} 
                        onClick = {() => {showUpload(true)}}
                      />}
              />
          </div>
          <Modal
            title = "Update your avatar!"
            visible = {upload}
            onCancel = {() => {showUpload(false)}}
            width = {250}
            footer = {null}
          >
            <Uploader/>
          </Modal>


          <Card title="User Info" bordered={false}>
          
          <br />
          <Descriptions title="" bordered>
              <Descriptions.Item label="User Name" span={3}>
                  {edit ? <Input value = {inputName} type = "text" onChange = {inputChangeName.bind(this)} />: <Input value = {inputName} type = "text" disabled = 'true' />}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={3}>
                  {edit ? <Input value = {inputPNumber} type = "text" onChange = {inputChangePNumber.bind(this)} />: <Input value = {inputPNumber} type = "text" disabled = 'true' />}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                  {edit ? <Input value = {inputMail} type = "text" onChange = {inputChangeMail.bind(this)} />: <Input value = {inputMail} type = "text" disabled = 'true' />}
              </Descriptions.Item>
              <Descriptions.Item label="City" span={3}>
                  {edit ? <Input value = {inputCity} type = "text" onChange = {inputChangeCity.bind(this)} />: <Input value = {inputCity} type = "text" disabled = 'true' />}
              </Descriptions.Item>
              <Descriptions.Item label="Intro" span={3}>
                  {edit ? <Input value = {inputIntro} type = "text" onChange = {inputChangeIntro.bind(this)} />: <Input value = {inputIntro} type = "text" disabled = 'true' />}
              </Descriptions.Item>
          </Descriptions>
          {createButton()}
          </Card>
          <br />
          <Card title="Rating" bordered={false}>
              <Rate allowHalf disabled defaultValue={4.5} />
          </Card>
          <Card title="Comments" bordered = {false}>
            { comment ? 
              <CommentCollection id = {uuid} commentType = "user"/> : <Skeleton active/>
            }
          </Card>
          <br />
        </div>


    );
}
export default UserInfo;