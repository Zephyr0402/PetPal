import React, { useEffect, useState } from 'react';
import SingleComment from './Comment'
import './Comments.css';
import {getComments, postComment} from '../Services/commentService'
import {List, Divider} from 'antd'
import { CommentArea } from './CommentArea';

const CommentCollection = (props) => {

  const [comments, setComments] = useState([]);

  useEffect(async () => {
    await getComments(props.commentType, props.id).then(
      res => {    console.log(res);setComments(res)}
    )
  }, [])

  const onCommentSubmit = async (id, type, commentText) => {
    await postComment(id, type, commentText)
    const res = await getComments(props.commentType, props.id)
    setComments(res)
  }

  return (
    <div className="comments-wrapper">
      <CommentArea id = {props.id} type = {props.commentType} onCommentSubmit = {onCommentSubmit} onSubmitFinish = {() => {}}/>
      <List
        dataSource = {comments}
        header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
        itemLayout="horizontal"
        locale = {{emptyText: " "}}
        renderItem = {
          comment =>
          <>
            <SingleComment
              commentDetail={comment}
              onCommentSubmit = {onCommentSubmit}
              id = {comment.ucid}
              type = "comment"
              replies = {comment.replies.map(reply =>
                <SingleComment
                  commentDetail = {reply}
                  onCommentSubmit = {onCommentSubmit}
                  id = {comment.ucid}
                  type = "comment"
                />
              )}
            />
            <Divider />
            </>
        }
      />
    </div>
  );
};

export default CommentCollection;
