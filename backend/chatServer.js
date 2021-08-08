var app = require('./app')
const { v4: uuidv4 } = require('uuid');
const {Whisper, Channel} = require('./models/whisperModel');
var chatServer = require('http').createServer(app);
var io = require("socket.io")(chatServer, {
    cors: {
      origin: "http://localhost:3000",
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
        onlineUsers[curUserId].socketIds.push(socket.id)
    }

    //receive whisper message
    socket.on('whisper', async whisper => {
        var members = await Channel.find({
            'cid' : whisper.cid
        },'members')
        unreadMembers = members.filter((value) => {
            return value != curUserId
        })
        //store it to db
        await Whisper.create({
            'cid' : whisper.cid,
            'wid' : uuidv4(),
            'sender' : curUserId,
            'content' : whisper.content,
            'unread' : unreadMembers,
            'timestamp' : whisper.timestamp
        })

        //find receivers
        const channel = await Channel.findOne({
            'cid' : whisper.cid
        })
        const receivers = channel.members;

        //select online receivers to send message
        console.log("socket id: ", socket.id)
        console.log("online user:", onlineUsers)
        //socket.emit('forward-whisper', "to all socket");
        //io.to(socket.id).emit('forward-whisper',"to specific socket");
        for(let receiver of receivers){
            console.log(receiver)
            if(onlineUsers[receiver] == undefined){
                //do nothing
                console.log("you should not see this")
            }else{
                onlineUsers[receiver].socketIds.forEach((socketId) =>
                    {io.to(socketId).emit('forward-whisper', whisper);}
                )
            }
        }
    })

    //offline (exit chat room)
    socket.on('disconnect', () => {
        var socketLen = onlineUsers[curUserId].length
        onlineUsers[curUserId].socketIds.splice(socketLen-1,1)
    })

})

chatServer.listen(10043, () => {
    console.log('chat server listening on localhost:10043');
});