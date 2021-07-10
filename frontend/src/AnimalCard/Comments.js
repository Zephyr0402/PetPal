import React, { createElement, useEffect, useState } from 'react';
import SingleComment from './Comment'
import './Comments.css';
import {getComments} from '../Services/commentService'

const CommentCollection = (props) => {

  const [comments, setComments] = useState([]);

  useEffect(async () => {
    await getComments(props.commentType, props.src).then(
      res => setComments(res)
    )
  }, [])

  return (
    <div className = "comments">
      {
        comments.map(comment =>
          <SingleComment
            commentDetail={comment}
            replies = {comment.replies.map(reply =>
              <SingleComment commentDetail = {reply}/>
            )}
          />
        )
      }
    </div>
  );
};

export default CommentCollection;
