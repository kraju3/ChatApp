import React, {useState} from 'react';
import '../css/login.css'

import {Link} from 'react-router-dom'



function Login(props){

    const[name,setName]=useState('')
    const[server,setServerName]=useState('')

    return(
        
    <div>
    
        <form className="o-container o-container--xsmall c-card u-high">
        <header className="c-card__header">
        <h2 className="c-heading">
            Login
            <div className="c-heading__sub">Existing users</div>
        </h2>
        </header>
        <div className="c-card__body">
            <div className="o-form-element">
            <label className="c-label">
                Name:
                <input onChange={(event)=>setName(event.target.value)} className="c-field c-field--label" type="email" placeholder="your@email.com" />
            </label>
            </div>
            <div className="o-form-element">
            <label className="c-label">
                Server Name:
                <input onChange={(event)=>setServerName(event.target.value)} className="c-field c-field--label" type="email" placeholder="your@email.com" />
            </label>
            </div>
        </div>
        <footer className="c-card__footer">
            <Link to={`/chatapp/${server}`} onClick={(event)=>{
                console.log("button clicked")
                props.propgateInfo({name,server})
            }}>
            <button type="button" className="c-button c-button--brand c-button--block">
            Login
            </button>
            </Link>
        </footer>
        </form>

    </div>
    
    
    )
}


export default Login