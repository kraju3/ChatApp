import {useEffect, useState} from 'react';
import React from 'react'

import '../css/message.css'

function Message(props){

    const [sender,setSender] = useState(props.sender)
    const [message,setMessage] = useState(props.message)
    const [messageColor,setMessageColor] = useState("o-grid__cell o-grid__cell--width-30 o-grid__cell--offset-50")
    const [messageFrom,setSide]=useState("c-card__item c-card__item--info")
    const [date,setDate] = useState(new Date())
    const [logoPos,setlogoPos] = useState('')

    useEffect(()=>{
        setMessage(props.message)
        setSender(props.sender)
        setDate(new Date())
        setlogoPos(props.message.from===sender?'avatarLogo':'avatarLogo2')
        setMessageColor(props.message.from===sender?"o-grid__cell o-grid__cell--width-50 o-grid__cell--offset-50":"o-grid__cell o-grid__cell--width-50")
        setSide(props.message.from===sender?"c-card__item c-card__item--info":"c-card__item")
    },[props.message,sender,props.sender])

    return(
        <div>
            <div className="o-grid">
                <div className={messageColor}>
                        <div className={messageFrom}>

                            {message.message}
                        </div>
                        <span className={`c-avatar c-avatar u-xsmal ${logoPos}`} data-text={`${message.from}`}></span>
                
                </div>
            </div>
            <div className="o-grid__cell u-small u-text--loud u-text--quiet u-centered u-letter-box-medium">
            {`${date.getMonth()}/${date.getDay()}/${date.getFullYear()}  ${date.toTimeString()}`}
            </div>
        </div>
    )
}

export default Message