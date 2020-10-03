import React, { useEffect } from 'react';
import {Route,Switch} from 'react-router-dom'
import {useState} from 'react';
import Login from './Login'
import App from './App'
import '../css/App.css';





function Home(){
    const [name,setUserName] = useState('')
    const [server,UpdateServer] = useState('')
  
  
    useEffect(()=>{
      setUserName(name)
      UpdateServer(server)
      console.log(process.env.NODE_ENV)
      console.log(process.env.REACT_APP_SERVER)
  
    },[server,name])

    const setInfo=(info)=>{
      setUserName(info.name)
      UpdateServer(info.server)

      fetch(`${process.env.REACT_APP_SERVER}/server/login`,{method:"POST",headers:{
          "Content-Type":"application/json"

      },body:JSON.stringify(info)}).then(res=>res.json()).then(response=>{
        if(response){
          console.log(response)
        }
      })
    }

    return(

    <div>
     <div id="home">
        <nav className="navbar navbar-dark bg-dark">
          <strong className="navbar-brand"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-dots" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>ChatApp</strong>
          <span className="navbar-text">
          <a href="#">

          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-server" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4C14.665 5.474 11.68 6.667 8 6.667 4.318 6.667 1.333 5.473 1.333 4V2.667zm0 3.667v3C1.333 10.805 4.318 12 8 12c3.68 0 6.665-1.193 6.667-2.665V6.334c-.43.32-.931.58-1.458.79C11.81 7.684 9.967 8 8 8c-1.967 0-3.81-.317-5.21-.876a6.508 6.508 0 0 1-1.457-.79zm13.334 5.334c-.43.319-.931.578-1.458.789-1.4.56-3.242.876-5.209.876-1.967 0-3.81-.316-5.21-.876a6.51 6.51 0 0 1-1.457-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667v-1.665z"/>
          </svg>

          </a>
          </span>
        </nav>

    </div>
      <Switch>
      <Route exact path="/" render={(props)=><Login {...props} propgateInfo={setInfo}/>}></Route>
      <Route exact path={`/chatapp/${server}`} render={(props)=><App {...props} name={name} server={server}/>}></Route>
      </Switch>
    </div>
  
   )
}

export default Home