import React, { useState, useEffect} from 'react'
import { openSocket, closeSocket} from './Socket'
import Header from '../Layout/Header'
import {Layout, message} from 'antd'
import { ChannelList } from './Channel'
import { WhisperPanel } from './WhisperPanel'
import { withRouter } from 'react-router'
import './Chat.css'
import { getChannels, getUnreadWhisper, getWhispers } from '../Services/whisperService'
import { getHeader } from '../Services/userService'
var socket;
const Chat = (props) => {
    
    const [channels, setChannels] = useState([])
    const [cid, setCid] = useState("")
    const [unreadWhisper, setUnreadWhisper] = useState({})
    const [whisperList, setWhisperList] = useState({})

    useEffect(async () => {
        const r = await getHeader()
        socket = openSocket(r.uuid)
        socket.on("connect", () => {
            message.success("connected to chat server!")
        })
        socket.on("forward-whisper", data => {
            //if(data.cid == cid){
                var c = whisperList;
                c[data.cid].push({
                    'whisper' :{
                        'sender' : {
                            'uuid' : data.sender,
                            'avatar' : data.avatar
                        },
                        'content' : data.content
                    },
                    'uuid' : data.uuid
                })
                setWhisperList({...c})
            //}else{
                //user is not at current channel, there should be notifications
                // var newunread = unreadWhisper;
                // newunread[data.cid] += 1;
                // setUnreadWhisper(newunread);
            //}
        });
        return () => {closeSocket(socket)}
    }, [cid]);

    // useEffect(() => {

    // },[])

    useEffect(async () => {
        var channels = await getChannels();
        setChannels(channels);
    },[])

    useEffect(async () => {
        var wl = {}
        for(let channel of channels){
            const whisperInThisChannel = await getWhispers(channel.cid)
            wl[channel.cid] = whisperInThisChannel
        }
        setWhisperList(wl)
    }, [cid, channels])

    useEffect(async () => {
        var uw = await getUnreadWhisper()
        setUnreadWhisper(uw)
    },[])

    const onWhisperSend = (text) => {
        var whisperBody = {
            'cid' : cid,
            'content' : text,
            'timestamp' : new Date()
        }
        socket.emit('whisper', whisperBody)
    }
    
    const onChannelSwitch = (newcid) => {
        setCid(newcid)
    }

    return(
        <Layout style = {{height:'100%', alignItems:'center'}}>
            <Header></Header>
            <div className="chat-body">
                <ChannelList 
                    channels = {channels}
                    unread = {unreadWhisper}
                    onChannelSwitch = {onChannelSwitch}
                />
                <WhisperPanel
                    cid = {cid}
                    whisperList = {whisperList[cid]}
                    name = {channels.length > 0 && cid != "" ? channels.filter((channel) => channel.cid == cid)[0].name : ""}
                    avatar = {channels.length > 0 && cid != "" ? channels.filter((channel) => channel.cid == cid)[0].avatar : ""}
                    onWhisperSend = {onWhisperSend}
                />
            </div>
        </Layout>
    )
}

export default withRouter(Chat)