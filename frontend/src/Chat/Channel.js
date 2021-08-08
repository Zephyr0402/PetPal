import React, { useEffect, useState } from 'react'
import UserAvatar from '../Layout/Avatar'
import {Link} from 'react-router-dom'
import './Channel.css'

export const ChannelList = (props) => {
    const changeChannel = (cid) => {
        const allChannels = document.getElementsByClassName('channel-item')
        for(let channel of allChannels){
            channel.style.backgroundColor = 'rgb(255,255,255)'
        }
        const channelSelected = document.getElementById(cid)
        if(channelSelected != null){
            channelSelected.style.backgroundColor = 'rgb(245,245,245)'
        }
        props.onChannelSwitch(cid)
    }

    return(
        <div className="channel-list">
            {
                props.channels.map((channel) => 
                    <a href = {"#/"+channel.cid} onClick = {() => changeChannel(channel.cid)}>
                        <div className="channel-item" id = {channel.cid}>
                            <UserAvatar
                                size = {50}
                                src = {channel.avatar}
                            />
                            <b style = {{marginLeft:'2%', fontSize:"100%"}}>{channel.name}</b>
                        </div>
                    </a>
                )
            }
        </div>
    )
}