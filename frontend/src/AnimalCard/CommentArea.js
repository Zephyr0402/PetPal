import {Input, Form, Button, Avatar, Comment} from 'antd'
import React,{useEffect, useRef, useState} from 'react'
import UserAvatar from '../Layout/Avatar';
import { getUserInfo } from '../Services/userService';
import {showLoginRequiredModal} from "../Services/modal";


export const CommentArea = (props) => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState("");
    const [userId, setUserId] = useState("");

    const commentInput = useRef("");

    useEffect(() => {
      getUserInfo().then(res => {
          setAvatar(res.avatar);
          setUserId(res.uuid);
      }
      )
    },[]);

    const onCommentSubmit = (values) => {
        if(userId === "" || userId === undefined) {
            showLoginRequiredModal("Please login to add your comment");
        }else{
            const commentText = values.commentText;
            form.resetFields();
            props.onSubmitFinish(false);
            props.onCommentSubmit(props.id, props.type, commentText);
        }

    };

    return(
        <Comment
          avatar={
            <UserAvatar size = {20} src = {avatar} uuid = {userId}/>
          }
          content={
            <Form
                form = {form}
                onFinish = {onCommentSubmit}
            >
                <Form.Item name="commentText">
                    <Input.TextArea ref = {commentInput} id = "comment-text" rows={3} style = {{maxWidth:'90%', resize:'none'}}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary" >
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
          }
        />

    )
};
