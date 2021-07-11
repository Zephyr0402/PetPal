import React, { createElement, useEffect, useState } from 'react';
import SingleComment from './Comment'
import './Comments.css';
import {getComments, postComment} from '../Services/commentService'
import Header from '../Layout/Header'
import {List, Comment, Avatar} from 'antd'
import { CommentArea } from './CommentArea';

const CommentCollection = (props) => {

  const [comments, setComments] = useState([]);

  useEffect(async () => {
    await getComments(props.commentType, props.id).then(
      res => setComments(res)
    )
  }, [])

  const onCommentSubmit = async (id, type, commentText) => {
    await postComment(id, type, commentText).then(
      await getComments(props.commentType, props.id).then(
        res => setComments(res))
    )
  }

  return (
    <>
      <Header/>
      <CommentArea id = {props.id} type = {props.commentType} onCommentSubmit = {onCommentSubmit} onSubmitFinish = {() => {}}/>
      <List
        dataSource = {comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem = {
          comment =>
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
        }
      />
    </>
  );
};

export default CommentCollection;
