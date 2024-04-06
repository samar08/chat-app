import React from 'react'
import TimeAgo from 'timeago-react';
import '../../styles/style.css'
import ProfileAvatar from '../ProfileAvatar';
const RoomItem = ({room}) => {
   // console.log(room)
    const {createdAt, name,lastMessage} =room;
    //console.log(name);
    //console.log(createdAt);
  return (
    <div>
    {/* <div className='d-flex justify-content-between align-items-center'> */}
   <div style={{ justifyContent: 'space-between', alignItems:'center'}}> 
     <h3 className='text-disappear'>{name}</h3>
     <TimeAgo className='marginleft'
  datetime={lastMessage? new Date(lastMessage.createdAt): new Date(createdAt)}
/>
    </div>
    <div className='d-flex align-items-center text-black-70'>
        {
          lastMessage?
          <>
          <div className='d-flex align-items-center'>
            <ProfileAvatar src={lastMessage.author.avatar} name={lastMessage.author.name} size="sm"/>
          </div>
          <div className='text-disappear ml-2'>
            <div className='italic'>{lastMessage.author.name}</div>
            <span> {lastMessage.text}</span>
          </div>
          </>

          :<span>No messages yet...</span>
          
          }
    </div>
    </div>
  )
}

export default RoomItem
