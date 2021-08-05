import React, { useState, useEffect } from 'react'
import {socket, openSocket, closeSocket} from './Socket'
import Header from '../Layout/Header'
import {Layout} from 'antd'

const Chat = (props) => {

    const [text, setText] = useState("")

    useEffect(() => {
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
        //console.log(text)
        socket.emit('whisper', text)
    }

    const onWhisperType = (text) => {
        setText(text.target.value)
    }

    return(
        <Layout>
            <Header></Header>
            <input onChange = {onWhisperType}></input>
            <button type = 'button' onClick = {onWhisperSend}>
                send
            </button>
        </Layout>
    )
}

export default Chat