import {Avatar, Descriptions, Card, Button, Input, Image, Skeleton, message } from 'antd';
import React, {useState, useEffect, useRef } from 'react';
import { EditOutlined} from '@ant-design/icons';
import { getUserInfo, updateUserInfo, changeEmail, verify, logout } from '../Services/userService'
import './UserInfoPage.css'
import Modal from 'antd/lib/modal/Modal';
import Uploader from './Uploader';
import CommentCollection from '../AnimalCard/Comments';

function UserInfo(props){
    const [uuid, setUUid] = useState("");
    const [edit, setEdit] = useState(false);
    const [verModal, setVerModal] = useState(false);
    const [update, setUpdate] = useState(false);
    const [inputName, setInputName] = useState('');
    const [inputMail, setInputMail] = useState('')
    const [inputPNumber, setInputPNumber] = useState('');
    const [inputCity, setInputCity] = useState('');
    const [inputIntro, setInputIntro] = useState('');
    const [avatar, setAvatar] = useState('')
    const [upload, showUpload] = useState(false)
    const [comment, showComment] = useState(false)
    const [canSend, setCanSend] = useState(true)

    const codeInput = useRef("")
    const newEmailInput = useRef("")

    useEffect(() => {
      getUserInfo(props.uuid)
        .then((res) => {
          console.log(res.uuid);
          setUUid(res.uuid);
          setInputName(res.name);
          setInputPNumber(res.phone);
          setInputMail(res.email);
          setInputCity(res.city);
          setInputIntro(res.intro);
          setAvatar(res.avatar);
          showComment(true);
        })
      }, [update, upload, avatar, props]);

    const inputChangeName = (e) => {
      setInputName(e.target.value);
    }

    const inputChangePNumber = (e) => {
      setInputPNumber(e.target.value);
    }

    const inputChangeCity = (e) => {
      setInputCity(e.target.value);
    }

    const inputChangeIntro = (e) => {
      setInputIntro(e.target.value);
    }

    const enableEdit = () => {
      setEdit(!edit);
      if (edit) {
        const userInfoUpdated = {
          inputName,
          inputPNumber,
          inputCity,
          inputIntro,
        }
        updateUserInfo(userInfoUpdated)
          .then(() => {
            setUpdate(!update);
          })
      }
    };

    const showVerModal = () => {
      if(!verModal) {setCanSend(true)}
      setVerModal(!verModal);
    };

    const sendVerCode = () => {
      verify(newEmailInput.current.state.value)
      setCanSend(!canSend)
    }

    const onEmailChangeRequestSend = async () => {
      const res = await changeEmail(newEmailInput.current.state.value, codeInput.current.state.value)
      console.log(res)
      await logout()
      window.location.href = "/login"
    }

    const createButton = () => {
      return(
        <Button type="dashed" style={{float: "right"}} onClick={enableEdit}>
          {edit? "FINISH": "EDIT"}
        </Button>
      );
    };

    return(
        <div className="user-info-content">
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
          <div style = {{textAlign:'end', paddingRight:'3%', paddingTop:'0.5%', fontSize:'16px'}}>
            Account: <b>{inputMail}</b>
            <div style = {{display:'inline'}} onClick = {showVerModal}><EditOutlined /></div>
          </div>
          <Modal title="Email Address Change" visible={verModal}
              onCancel = {showVerModal}
              onOk = {onEmailChangeRequestSend}
              okButtonProps = {{disabled: canSend}}
          >
              <p>Input your new email address and we will send a verification email to it</p>
              <Input ref = {newEmailInput} addonAfter = {<Button disabled = {!canSend} onClick = {sendVerCode}>Send</Button>}/>
              <Input ref = {codeInput}/>
          </Modal>
          <Modal
            title = "Update your avatar!"
            visible = {upload}
            onCancel = {() => {showUpload(false)}}
            width = {250}
            footer = {null}
          >
            <Uploader hideUploadModal = {() => {showUpload(false)}}/>
          </Modal>


          <Card title="Profile" bordered={false}>

          <br />
          <Descriptions className='descriptions'
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        size='small'
          >
              <Descriptions.Item label="User Name" span={3}>
                  {edit ? <Input value = {inputName} type = "text" onChange = {inputChangeName.bind(this)} />: <Input value = {inputName} type = "text" disabled = 'true' />}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number" span={3}>
                  {edit ? <Input value = {inputPNumber} type = "text" onChange = {inputChangePNumber.bind(this)} />: <Input value = {inputPNumber} type = "text" disabled = 'true' />}
              </Descriptions.Item>
              <Descriptions.Item label="City" span={3}>
                  {edit ? <Input value = {inputCity} type = "text" onChange = {inputChangeCity.bind(this)} />: <Input value = {inputCity} type = "text" disabled = 'true' />}
              </Descriptions.Item>
              <Descriptions.Item label="Intro" span={3}>
                  {edit ? <Input value = {inputIntro} type = "text" onChange = {inputChangeIntro.bind(this)} />: <Input value = {inputIntro} type = "text" disabled = 'true' />}
              </Descriptions.Item>
          </Descriptions>
          { props.isMe? createButton() : null}
          </Card>
          <br />
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
