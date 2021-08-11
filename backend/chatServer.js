var app = require('./app')
const { v4: uuidv4 } = require('uuid');
const {Whisper, Channel} = require('./models/whisperModel');
const {UserInfo} = require('./models/userModel');
var chatServer = require('http').createServer(app);
var io = require("socket.io")(chatServer, {
    cors: {
      origin: "https://petpal-cpsc455.herokuapp.com:10043",
      methods: ["GET", "POST"]
    }
});
const USER_STATUS = ['online', 'offline']
var onlineUsers = {};
io.on('connection', (socket) => {
    curUserId = socket.handshake.headers.uuid
    //on connection(a user enter chat room)

    //add user to online user list
    if(onlineUsers[curUserId] == undefined){
        onlineUsers[curUserId] = {
            'socketIds' : [socket.id],
            'status' : USER_STATUS[0]
        }
    }else{
        onlineUsers[curUserId].socketIds = []
        onlineUsers[curUserId].socketIds.push(socket.id)
    }

    console.log(onlineUsers)
    //receive whisper message
    socket.on('whisper', async whisper => {
        curUserId = socket.handshake.headers.uuid
        var m = await Channel.findOne({
            'cid' : whisper.cid
        },'members')

        var unreadMembers = m.members.filter((value) => {
            return value != curUserId
        })
        //store it to db
        var w = await Whisper.create({
            'cid' : whisper.cid,
            'wid' : uuidv4(),
            'sender' : curUserId,
            'content' : whisper.content,
            'unread' : unreadMembers,
            'timestamp' : whisper.timestamp
        })

        const uavatar = await UserInfo.findOne({
            'uuid' : curUserId
        },'avatar')
        var c = {}
        c["avatar"] = uavatar.avatar
        
        //find receivers
        const channel = await Channel.findOne({
            'cid' : whisper.cid
        })
        const receivers = channel.members;

        //select online receivers to send message
        for(let receiver of receivers){
            if(onlineUsers[receiver] == undefined){
                //do nothing
            }else{
                console.log(receiver)
                c["uuid"] = receiver;
                onlineUsers[receiver].socketIds.forEach((socketId) =>
                    {   
                        console.log(socketId)
                        io.to(socketId).emit('forward-whisper', {...(w._doc),...c});
                    }
                )
            }
        }
    })

    //offline (exit chat room)
    socket.on('disconnect', (reason) => {
        console.log(reason)
        curUserId = socket.handshake.headers.uuid
        var socketLen = onlineUsers[curUserId].length
        onlineUsers[curUserId].socketIds.splice(socketLen-1,1)
    })

})

chatServer.listen(10043, () => {
    console.log('chat server listening on localhost:10043');
});
