import React from 'react'
import TimeAgo from 'timeago-react';
import '../../styles/style.css'
const RoomItem = ({room}) => {
    console.log(room)
    const {createdAt, name} =room;
    console.log(name);
    console.log(createdAt);
  return (
    <div>
    <div className='d-flex justify-content-between align-items-center'>
    {/* <div className='roomtitle'> */}
     <h3 className='text-disappear'>{name}</h3>
     <TimeAgo className='marginleft'
  datetime={new Date(createdAt)}
/>
    </div>
    <div className='d-flex align-items-center text-black-70'>
        <span>No messages yet...</span>
    </div>
    </div>
  )
}

export default RoomItem
