import React from 'react'
import {Avatar} from 'antd'

const UserAvatar = (props) => {
    return( 
        <a href ="/">
        <Avatar
            size = {props.size}
            src = {props.src}
        /></a>
    )
}

export default UserAvatar