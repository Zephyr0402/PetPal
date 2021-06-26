import { Comment, Tooltip, Avatar, Descriptions, Rate, Card, Button, Input } from 'antd';
import React, { createElement, useState } from 'react';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import './UserInfoPage.css'

function UserInfo(){
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [edit, setEdit] = useState(false);
    const [inputName, setInputName] = useState('Julia');
    const [inputPNumber, setInputPNumber] = useState('604-xxx-xxxx');
    const [inputMail, setInputMail] = useState('xxx@gmail.com');
    const [inputCity, setInputCity] = useState('Vancouver');
    const [inputIntro, setInputIntro] = useState('I love cats and dogs.');

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
    
    const like = () => {
      setLikes(1);
      setDislikes(0);
      setAction('liked');
    };
    
    const dislike = () => {
      setLikes(0);
      setDislikes(1);
      setAction('disliked');
    };

    const enableEdit = () => {
      setEdit(!edit);
    };

    const createButton = () => {
      return(
        <Button type="dashed" style={{float: "right"}} onClick={enableEdit}> 
          {edit? "FINISH": "EDIT"}
        </Button>
      );
    };

    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={like}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];
        
    return(
        <div style = {{height:'100%'}}>
        <div className="avatar">
            <Avatar size={64} icon={<UserOutlined />} />
        </div>
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
        <br />
        <Card title="Comments" bordered={false}>
            <Comment
            actions={actions}
            author="Vincent"
            avatar={
                <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9r3ogaSmpwNYSaEKRifVaHjwmYsKSW7fC6Q&usqp=CAU"
                alt="Vincent"
                />
            }
            content={
                <p>
                Always nice and patient
                </p>
            }
            datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
                </Tooltip>
            }
            />
        </Card>

        
        </div>


    );
}
export default UserInfo;