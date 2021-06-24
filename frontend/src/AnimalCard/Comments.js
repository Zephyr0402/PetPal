import React, { createElement, useState } from 'react';
import UserComment from './Comment'

//grab comments by animalID from the back end here
const data = [
  {
    user: 'Nawa',
    userAvatar: 'userAvatars/nawa.png',
    content: 'Jerry is sooooo cute! I sooooo love it!',
    subComments:[
      {
        user: 'Julia',
        userAvatar: 'userAvatars/julia.jpg',
        content: 'Thank you! Jerry is my favorite!'
      }
    ]
  },
  {
    user: 'Runze',
    userAvatar: 'userAvatars/tsuki.jpg',
    content: 'I\'ll raise my offer to 100 bucks! Deal?',
    subComments: []
  },
  {
    user: 'Shijun',
    userAvatar: 'userAvatars/shijun.jpg',
    content: 'DONT listen to Runze, I bet he\'s a dog person!',
    subComments:[
      {
        user: "Runze",
        userAvatar: 'userAvatars/tsuki.jpg',
        content: 'Hey! Watch your language, you are a dog person!',
      }
    ]
  }
]

const Comments = () => {
  return (
    <div className = "comments">
      {
        data.map(e => 
          <UserComment 
            commentDetail={e} 
            subComments = {e.subComments.map(sub => 
              <UserComment commentDetail = {sub}/>
            )}
          />
        )
      } 
    </div>
  );
};

export default Comments