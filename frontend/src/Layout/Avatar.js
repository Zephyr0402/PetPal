import React, {useState} from 'react'
import {Avatar, Image} from 'antd'

const UserAvatar = (props) => {
    return( 
        <a href = {'/user/'+props.uuid}>
            <Avatar
            style = {{border:"1px solid rgb(220,220,220)"}}
                size = {props.size}
                src = {<img style = {{height: props.size, width: props.size}} src={props.src}></img>}
            />
        </a>
    )
}

export default UserAvatar