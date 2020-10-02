import React, { useEffect } from 'react';
import {useState} from 'react';
import MessageBox from './MessageBox'
import '../css/App.css';



function App(props) {
  
  const [name,setUserName] = useState(props.name)
  const [server,UpdateServer] = useState(props.server)

  useEffect(()=>{
    setUserName(name)
    UpdateServer(server)

  },[server,name])


  return (
      <div className="o-grid o-grid--no-gutter main">
    
      <MessageBox name={name} messages={props.messages} server={server}/>
    
      </div>
   
  );
}

export default App;
