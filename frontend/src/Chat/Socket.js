import { io } from "socket.io-client";
const SERVER = "http://localhost:10043";

export var socket;

export const openSocket = (uuid) => {
    const options = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'uuid' : uuid
                }
            }
        }
    }
    socket = io(SERVER, options)
}

export const closeSocket = () => {
    socket.disconnect()
}