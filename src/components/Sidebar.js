import React, { useEffect, useState, useRef} from 'react'
import { Divider } from 'rsuite'
import Toggle from '../components/dashboard/Toggle'
import CreateRoombtnModal from './CreateRoombtnModal'
import ChatRoomList from './rooms/ChatRoomList'

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height,setHeight]=useState(0);
  useEffect(()=>{
    if(topSidebarRef.current){
      setHeight(topSidebarRef.current.scrollHeight);
    }
  },[topSidebarRef]);
  return (
    <div className='h-100 pt-2'>
      <div ref={topSidebarRef}>
        <Toggle/>
        <CreateRoombtnModal/>
        <Divider>List</Divider>
      </div>
       <ChatRoomList aboveElHeight={height}/>
    </div>
  )
}

export default Sidebar

