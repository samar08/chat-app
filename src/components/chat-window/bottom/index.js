import React,{useState,useCallback} from 'react'
import { Input, InputGroup } from 'rsuite'
import SendIcon from '@rsuite/icons/Send';
import {useProfile} from '../../../context/profile.context';
import { useParams } from 'react-router-dom';
import { database } from '../../../misc/firebase';
import { ref,push,update } from 'firebase/database';
function assembleMessage(profile, chatId){
  return {
    roomId:chatId,
    author:{
      name:profile.name,
      uid:profile.uid,
      ...(profile.avatar? {avatar: profile.avatar}:{})
    },
    createdAt:Date.now()
  }
}
const Bottom = () => {
  const [input,setInput]=useState('');
  const [isLoading, setIsLoading]=useState(false);
  const {chatId}=useParams();
  const {profile}=useProfile();
  const onInputChange=useCallback((value)=>{
setInput(value);
  },[]);

const onSendClick=()=>{
  console.log('onSend clicked');
  if(input.trim()=== ''){
    console.log('input is empty')
    return;
  }
  const msgData=assembleMessage(profile,chatId);
  msgData.text = input;
  console.log(input)
  const updates={};
  const messageId=push(ref(database, 'messages')).key;
updates[`/messages/${messageId}`]=msgData;
updates[`/rooms/${chatId}/lastMessage`]={
  ...msgData,
  msgId:messageId,
}
setIsLoading(true);
update(ref(database),updates).then(()=>{
  setInput('');
  setIsLoading(false);

}).catch((error)=>{
  setIsLoading(false)
  alert(error);
})

}

const onKeyDown=(event)=>{
  if(event.keyCode === 13){
    event.preventDefault();
    onSendClick()
  }
}
  return (
    <div>
      <InputGroup>
      <Input placeholder='Write a new message here...' value={input} onChange={onInputChange} onKeyDown={onKeyDown}/>
      <InputGroup.Button color="blue" appearance='primary' onClick={onSendClick} disabled={isLoading}>
      <SendIcon/>
      </InputGroup.Button>
      
      </InputGroup>
    </div>
  )
}

export default Bottom
