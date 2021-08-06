import React, {useState, useEffect} from 'react'
import UserAvatar from '../Layout/Avatar'
import {Input, Button} from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import Picker from 'emoji-picker-react';
import './WhisperPanel.css'

var whisperList = [
    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u1"
        },
        'uuid' : 'u1'
    },
    {
        'whisper' : {
            'sender' : {
                'uuid' : "u2",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u2"
        },
        'uuid' : 'u1'
    },
    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },
    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },
    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u3",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u3",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u3",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u3",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u3",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    },    {
        'whisper' : {
            'sender' : {
                'uuid' : "u1",
                'avatar' : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            },
            'content' : "hello from u3"
        },
        'uuid' : 'u1'
    }

]

export const WhisperPanel = (props) => {
    console.log(props.cid)
    return(
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
                />
                <Button type = "link">Send</Button>
            </div>
        </div>
    )
}

export const Whisper = (props) => {
    const [isMineWhisper, ] = useState(props.whisper.sender.uuid == props.uuid)

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