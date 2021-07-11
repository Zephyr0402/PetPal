import { Input, Form, Button, Avatar, Comment } from 'antd'
import React,{useRef} from 'react'

export const CommentArea = (props) => {
    const [form] = Form.useForm();

    const commentInput = useRef("");

    const onCommentSubmit = (values) => {
        const commentText = values.commentText;
        form.resetFields();
        props.onSubmitFinish(false);
        props.onCommentSubmit(props.id, props.type, commentText);
    }

    return(
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Form
                form = {form}
                onFinish = {onCommentSubmit}
            >
                <Form.Item name="commentText">
                    <Input.TextArea ref = {commentInput} id = "comment-text" rows={3} style = {{maxWidth:'40%', resize:'none'}}/>
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