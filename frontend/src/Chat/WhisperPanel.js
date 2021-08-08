import React, {useState, useEffect} from 'react'
import UserAvatar from '../Layout/Avatar'
import {Input, Button, Empty} from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import Picker from 'emoji-picker-react';
import './WhisperPanel.css'
import { getWhispers } from '../Services/whisperService';

var iwList = [
    {
        'whisper' : {
            'sender' : {
                'uuid' : "",
                'avatar' : ""
            },
            'content' : ""
        },
        'uuid' : 'u1'
    }
]

export const WhisperPanel = (props) => {

    const [text, setText] = useState("")
    const [whisperList, setWhisperList] = useState(iwList)

    useEffect(() => {
        setText("")
    },[props])

    useEffect(async () => {
        if(props.cid !== ""){
            var whisperList = await getWhispers(props.cid)
            setWhisperList(whisperList)
        }
    },[props])

    const onWhisperType = (e) => {
        setText(e.target.value)
    }

    const onWhisperSend = () => {
        props.onWhisperSend(text)
        setText("")
    }

    return(
        props.cid == "" ?
            <div className = "whisper-panel">
            <Empty></Empty>
            </div>
            :
            <div className = "whisper-panel">
                <div className = "whisper-header">
                    <UserAvatar
                        size = {45}
                        src = {props.avatar}
                    />
                    <b style = {{marginLeft:'0.5%', fontSize:"100%"}}>{props.name}</b>
                </div>
                <div className = "whisper-list">
                    {
                        whisperList.map((whisper) => 
                            <Whisper
                                whisper = {whisper.whisper}
                                uuid = {whisper.uuid}
                            />
                        )
                    }
                </div>
                <div className = "whisper-input">
                    <SmileOutlined style = {{fontSize:'25px', color:'gray'}}/>
                    <Input
                        bordered = {false}
                        placeholder = "Say something..."
                        onChange = {onWhisperType}
                        value = {text}
                    />
                    <Button type = "link" onClick = {onWhisperSend}>Send</Button>
                </div>
            </div>
    )
}

export const Whisper = (props) => {
    var isMineWhisper = props.whisper.sender.uuid == props.uuid

    const myWhisperStyle = {
        'display' : 'flex',
        'flex-direction' : 'row-reverse'
    }
    const othersWhisperStyle = {
        'display' : 'flex',
        'flex-direction' : 'row',
        'justify-content' : 'flex-start'
    }

    return(
        <div className = "whisper-list-item" style = {isMineWhisper ? myWhisperStyle : othersWhisperStyle}>
            <UserAvatar
                size = {35}
                src = {props.whisper.sender.avatar}
            />
            <div className="whisper-content">{props.whisper.content}</div>
        </div>
    )
}