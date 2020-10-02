import React from 'react'
import {useState,useEffect} from 'react';
import socketIOClient from "socket.io-client";
import '../css/MessageBox.css'
import Message from './Message'

function MessageBox(props){


    let [socket]=useState(socketIOClient(process.env.ENDPOINT));
    const [name,setName]=useState(props.name)
    const [server,setServer]=useState(props.server)
    const[messages,setMessages] = useState([])
    const[userMessage,setUserMessage] = useState('')
  

    useEffect(()=>{
        setServer(props.server)
        setName(name)
  
        socket.emit('join',{name,server})


        return ()=>{
          socket.emit('disconnect');
          socket.off()
        }
    },[server,name,props.server,socket])

    useEffect(()=>{

      socket.on('chat-message',(data)=>{
        let newMessage_=data
        setMessages([...messages,newMessage_])
        console.log(data);
      });
      pageScroll()
    },[messages,socket]);

    useEffect(()=>{

      socket.on('message',(data)=>{
        let newMessage_=data
        setMessages([...messages,newMessage_])
        console.log(data);
      });
      pageScroll()

    },[messages,socket]);

    

    return(
<div className="o-grid__cell o-grid__cell--width-100 messageBox">
    {messages.map((message,index)=>{
        return <Message key={index} sender={name} message={message}/>
    })}
    <div className="c-input-group u-letter-box-medium chatbox">
      <div className="o-field o-field--icon-right">
        <input onKeyPress={(e)=>{
        if(e.key == 'Enter'){
          let newMessage = {message:userMessage,from:name}
          setMessages(messages=>[...messages,newMessage]);
          setUserMessage('')
          console.log(messages)
          socket.emit('client-message',newMessage)
       }
      }}
       onChange={(event)=>{setUserMessage(event.target.value)}} value={`${userMessage}`}className="c-field" placeholder="Message" />
        <i className="fa-fw far fa-smile c-icon"></i>
      </div>
      <a onClick={
        (event)=>{
          event.preventDefault()
          let newMessage = {message:userMessage,from:name}
          setMessages(messages=>[...messages,newMessage]);
          setUserMessage('')
          console.log(messages)
          socket.emit('client-message',newMessage)
      }
      }
      className="c-button c-button--brand" aria-label="Send message">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
</svg>
      </a>
    </div>
  </div>
    )
}

function pageScroll() {
  window.scrollTo(0,document.body.scrollHeight);

}
export default MessageBox