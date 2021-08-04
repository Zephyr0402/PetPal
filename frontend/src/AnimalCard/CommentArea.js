import { Input, Form, Button, Avatar, Comment } from 'antd'
import React,{useEffect, useRef, useState} from 'react'
import UserAvatar from '../Layout/Avatar';
import { getUserInfo } from '../Services/userService';

export const CommentArea = (props) => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState({});
    console.log(avatar.uuid)
    const commentInput = useRef("");

    useEffect(() => {
      getUserInfo().then(
        res => setAvatar(res)
      )
    },[])

    const onCommentSubmit = (values) => {
        const commentText = values.commentText;
        form.resetFields();
        props.onSubmitFinish(false);
        props.onCommentSubmit(props.id, props.type, commentText);
    }



    return(
        <Comment
          avatar={
            <UserAvatar size = {20} src = {avatar.avatar} uuid = {avatar.uuid}/>
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
}