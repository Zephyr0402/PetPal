import { io } from "socket.io-client";
const SERVER = "https://petpal-cpsc455.herokuapp.com";

export const openSocket = (uuid) => {
    const options = {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'uuid' : uuid
                }
            }
        },
        rejectUnauthorized: false,
        secure: true, 
        reconnection: true
    }
    return io(SERVER, options)
}

export const closeSocket = (socket) => {
    socket.disconnect()
}
