import React from 'react'
import UserAvatar from '../Layout/Avatar'
import {Link} from 'react-router-dom'
import './Channel.css'

var channels = [
    {
        'cid' : 'channel1',
        'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        'name' : 'channel1'
    },
    {
        'cid' : 'channel2',
        'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        'name' : 'channel2'
    },
    {
        'cid' : 'channel3',
        'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        'name' : 'channel3'
    }
]

export const ChannelList = (props) => {
    return(
        <div className="channel-list">
            {
                channels.map((channel) => 
                    <Link to = {{hash:"/"+channel.cid}}>
                        <div className="channel-item">
                            <UserAvatar
                                size = {50}
                                src = {channel.avatar}
                            />
                            <b style = {{marginLeft:'2%', fontSize:"100%"}}>{channel.name}</b>
                        </div>
                    </Link>
                )
            }
        </div>
    )
}