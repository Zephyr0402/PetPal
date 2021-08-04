import React, {useState} from 'react'
import {Avatar, Image} from 'antd'

const UserAvatar = (props) => {
    return( 
        <a href = {'/user/'+props.uuid}>
            <Avatar
                size = {props.size}
                src = {<img style = {{height: props.size, width: props.size}} src={props.src}></img>}
            />
        </a>
    )
}

export default UserAvatar