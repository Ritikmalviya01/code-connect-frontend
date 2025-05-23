import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("")
const {targetUserId} = useParams();
const  user = useSelector(store => store.user)
const userId = user?._id ;


const fetchChatMessages = async () => {
  const chat = await axios.get(BASE_URL+ "/chat/"+ targetUserId, {
    withCredentials: true,
  })
console.log(chat.data.messages)

const chatMessages = chat?.data?.messages.map((msg) => {
  const { senderId, text } = msg;
  const sender = senderId?.[0]; // get the first element from the array
  return {
    firstName: sender?.firstName,
    lastName: sender?.lastName,
    text}
})
setMessages(chatMessages)
}

useEffect(() => {
fetchChatMessages()
}, [])

useEffect(() => {
 const socket = createSocketConnection();
 socket.emit("joinChat", {firstName: user?.firstName, userId, targetUserId});

socket.on("messageReceived", ({firstName,lastName, text}) =>{
  setMessages((messages) => [...messages, { firstName, lastName, text}])
} )


 return ()=> {
  socket.disconnect();
 }
}, [userId, targetUserId])


const sendMessage = () =>{
 try {
  const socket = createSocketConnection();
  

  socket.emit("sendMessage", {firstName : user.firstName, lastName : user.lastName , userId , targetUserId, text: newMessage})
  setNewMessage("")
 } catch (error) {
  console.log("errrrrorrrrr")
 }
}

  return (
    <div className='w-1/2 mx-auto border border-white m-5 h-[70vh] flex flex-col '>
        <h1 className='p-5 border-b border-white '>Chat</h1>
        <div className='flex-1 overflow-scroll p-5'>
           {messages.map((msg, index) => {
            return (
<div key={index} className={"chat " + (user?.firstName === msg?.firstName ? "chat-end" : "chat-start")}>
<div className="chat-header">
          {msg.firstName + " " + msg.lastName} 
    <time className="text-xs opacity-50">2 hours ago</time>
  </div>
  <div className="chat-bubble">{msg.text}</div>
  <div className="chat-footer opacity-50">Seen</div>
</div>
            )
            
})}
          
        </div>
        <div className='p-5 border-t border-white flex items-center gap-2'>
            <input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className='flex-1 border border-gray-500 text-white rounded p-2'></input>
            <button onClick={sendMessage} className='btn btn-primary'>send</button>
        </div>
    </div>
  )
}

export default Chat