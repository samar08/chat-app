import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import { ref,orderByChild ,query, equalTo,onValue, off} from 'firebase/database';
import { transformToArrWithId } from '../../../misc/helpers';
import Messageitem from './Messageitem';
const Messages = () => {
  const {chatId}=useParams()
  const [messages,setMessages]=useState(null);
  const isChatEmpty=messages && messages.length===0;
  const canshowmessages=messages && messages.length >0;
  useEffect(()=>{
    const messagesRef=ref(database,'/messages')
    onValue(query(messagesRef,orderByChild('roomId'),equalTo(chatId)),(snapshot)=>{
      const data=transformToArrWithId(snapshot.val());
      //console.log('data from message index ', data)
      setMessages(data);
    });

    return ()=>{
      off(messagesRef)
    }
  },[chatId])
  return (
    <ul className='msg-list custom-scroll'>
    {isChatEmpty && <li>No messages yet</li>}
    {canshowmessages && messages.map(msg=> <Messageitem key={msg.id} message={msg} />)}
    </ul>
  )
}

export default Messages
