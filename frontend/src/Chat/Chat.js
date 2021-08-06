import React, { useState, useEffect } from 'react'
import {socket, openSocket, closeSocket} from './Socket'
import Header from '../Layout/Header'
import {Layout} from 'antd'
import { ChannelList } from './Channel'
import { WhisperPanel } from './WhisperPanel'
import { withRouter } from 'react-router'
import './Chat.css'

const Chat = (props) => {
    const cid = props.location.hash.substring(2)

    useEffect(() => {
        console.log("fffffffffffffffffff")
        openSocket()
        socket.on("connect", () => {
            console.log("connected to backend")
        })
        socket.on("forward-whisper", data => {
            console.log(data)
        });
        return closeSocket
      }, []);

    const onWhisperSend = () => {
    }

    const onWhisperType = (text) => {
    }

    return(
        <Layout style = {{height:'100%', alignItems:'center'}}>
            <Header></Header>
            <div className="chat-body">
                <ChannelList/>
                <WhisperPanel
                    cid = {cid}
                    name = "example" 
                    avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
            </div>
        </Layout>
    )
}

export default withRouter(Chat)