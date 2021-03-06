import React , {createElement,useState} from 'react';
import { Comment, Tooltip } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import {LikeComment, DislikeComment} from '../Services/commentService'
import { notifyLike } from '../Services/notificationService';
import {CommentArea} from './CommentArea'
import UserAvatar from '../Layout/Avatar';

const SingleComment = (props) => {
    const cmtDetail = props.commentDetail;
    const [liked, setLiked] = useState(cmtDetail.liked);
    const [likes, setLikes] = useState(cmtDetail.likes.length)
    const [disliked, setDisliked] = useState(cmtDetail.disliked);
    const [showCommentArea,setShowCommentArea] = useState(false)

    const like = async() => {
      setLiked(true);
      setLikes(likes +1);
      setDisliked(false);
      await notifyLike(cmtDetail.cmtorid, cmtDetail.ucid);
      await LikeComment(cmtDetail.ucid,'set');
    }

    const cancelLike = () => {
      setLiked(false);
      setLikes(likes - 1);
      LikeComment(cmtDetail.ucid,'cancel');
    }

    const dislike = () => {
      setDisliked(true);
      DislikeComment(cmtDetail.ucid, 'set');
    }

    const cancelDislike = () => {
      setDisliked(false);
      DislikeComment(cmtDetail.ucid, 'cancel');
    }

    const onLike = () => {
      if(!liked){
        like();
        if(disliked) cancelDislike();
      }
      else{
        cancelLike();
      }
    };
  
    const onDislike = () => {
      if(!disliked){
        dislike();
        if(liked) cancelLike();
      }
      else{
        cancelDislike();
      }
    };

    const showComment = () => {
      setShowCommentArea(!showCommentArea);
    }
  
    const formatDate = (date) => {
      date = new Date(date)
      var y = date.getFullYear();  
      var m = date.getMonth() + 1;  
      m = m < 10 ? ('0' + m) : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      var h = date.getHours();  
      var minute = date.getMinutes();  
      minute = minute < 10 ? ('0' + minute) : minute; 
      var second= date.getSeconds();  
      second = minute < 10 ? ('0' + second) : second;  
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;  
    }

    const actions = [
      <Tooltip key="comment-basic-like" title="Like">
        <span onClick={onLike}>
          {createElement(liked ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={onDislike}>
          {createElement(disliked ? DislikeFilled : DislikeOutlined)}
        </span>
      </Tooltip>,
      cmtDetail.canReply ? <span key="comment-basic-reply-to" onClick = {showComment}>Reply to</span> : "",
    ];

    return(
        <Comment
            actions={actions}
            author={<a>{cmtDetail.name}</a>}
            avatar={
                <UserAvatar size = {35} src = {cmtDetail.avatar} uuid = {cmtDetail.cmtorid}/>
            }
            content={
                <p>
                  {cmtDetail.content}
                </p>
            }
            datetime={
                <span>{formatDate(cmtDetail.time)}</span>
            }
        >
          {props.replies}
          {
            showCommentArea ? 
            <CommentArea id = {props.id} type = {props.type} onCommentSubmit = {props.onCommentSubmit} onSubmitFinish = {setShowCommentArea}/> : ""}
        </Comment>
    )
}

export default SingleComment;
