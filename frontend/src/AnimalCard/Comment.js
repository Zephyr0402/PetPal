import React , {createElement,useState} from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

const SingleComment = (props) => {
    const cmtDetail = props.commentDetail;

    const [liked, setLike] = useState(0);
    const [disliked, setDisliked] = useState(0);
    const [action, setAction] = useState(null);
  
    const like = () => {
      setLikes(likes+1);
      //setDislikes(0);
      setAction('liked');
    };
  
    const dislike = () => {
      //setLikes(0);
      setDislikes(dislikes+1);
      setAction('disliked');
    };
  
    const formatDate = (date) => {  
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
        <span onClick={like}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip key="comment-basic-dislike" title="Dislike">
        <span onClick={dislike}>
          {createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
        </span>
      </Tooltip>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return(
        <Comment
            actions={actions}
            author={<a>{cmtDetail.name}</a>}
            avatar={
                <Avatar
                src={cmtDetail.avatar}
                alt="Han Solo"
                />
            }
            content={
                <p>
                  {cmtDetail.content}
                </p>
            }
            datetime={
                <span>{cmtDetail.time}</span>
            }
        >
          {props.replies}
        </Comment>
    )
}

export default SingleComment;