import React, {useState} from 'react'
import {Avatar} from 'antd'

const UserAvatar = (props) => {
    const [url, setUrl] = useState("/user/"+props.uuid)
    return( 
        <a href = {url}>
            <Avatar
                size = {props.size}
                src = {props.src}
            />
        </a>
    )
}

export default UserAvatar