import { Comment, Tooltip, Avatar, Descriptions, Rate, Card } from 'antd';
import React, { createElement, useState } from 'react';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import './UserInfoPage.css'



function UserInfo(){
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    
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
        <>
        <div className="avatar">
            <Avatar size={64} icon={<UserOutlined />} />
        </div>
        <Card title="User Info" bordered={false} style={{ width: 800 }}>
        <Descriptions title="" bordered>
            <Descriptions.Item label="User Name" span={3}>
                Julia
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number" span={3}>
                604-xxx-xxxx
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={3}>
                xxx@gmail.com
            </Descriptions.Item>
            <Descriptions.Item label="City" span={3}>
                Vancouver
            </Descriptions.Item>
            <Descriptions.Item label="Intro" span={3}>
            I love cats and dogs.
            </Descriptions.Item>
        </Descriptions>
        </Card>
        <br />
        <Card title="Rating" bordered={false} style={{ width: 800 }}>
            <Rate allowHalf disabled defaultValue={4.5} />
        </Card>
        <br />
        <Card title="Comments" bordered={false} style={{ width: 800 }}>
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

        
        </>


    );
}
export default UserInfo;