import React, { useState, useEffect } from 'react'
import {socket, openSocket, closeSocket} from './Socket'
import Header from '../Layout/Header'
import {Layout} from 'antd'
import { ChannelList } from './Channel'
import { WhisperPanel } from './WhisperPanel'
import { withRouter } from 'react-router'
import './Chat.css'
import { getChannels } from '../Services/whisperService'
import { ConsoleSqlOutlined } from '@ant-design/icons'

const Chat = (props) => {
    const [channels, setChannels] = useState([])
    const [cid, setCid] = useState(props.location.pathname.substring(1))

    useEffect(() => {
        openSocket("b56f1c7e-bc02-401a-81dd-d8703adb4190")
        socket.on("connect", () => {
            console.log("connected to backend")
        })
        socket.on("forward-whisper", data => {
            console.log(data)
        });
        return closeSocket
      }, []);

    useEffect(async () => {
        var channels = await getChannels()
        console.log(channels)
        setChannels(channels)
    },[])

    const onWhisperSend = (text) => {
        var whisperBody = {
            'cid' : cid,
            'content' : text,
            'timestamp' : new Date()
        }
        console.log(whisperBody)
        socket.emit('whisper', whisperBody)
    }
    
    const onChannelSwitch = (newcid) => {
        setCid(newcid)
    }

    return(
        <Layout style = {{height:'100%', alignItems:'center'}}>
            <Header></Header>
            <div className="chat-body">
                <ChannelList channels = {channels} onChannelSwitch = {onChannelSwitch}/>
                <WhisperPanel
                    cid = {cid}
                    name = {channels.length > 0 && cid != "" ? channels.filter((channel) => channel.cid == cid)[0].name : ""}
                    avatar = {channels.length > 0 && cid != "" ? channels.filter((channel) => channel.cid == cid)[0].avatar : ""}
                    onWhisperSend = {onWhisperSend}
                />
            </div>
        </Layout>
    )
}

export default withRouter(Chat)