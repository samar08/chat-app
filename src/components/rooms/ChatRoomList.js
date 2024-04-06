import React from 'react'
import { Loader, Nav } from 'rsuite'
import RoomItem from './RoomItem'
import { useRooms } from '../../context/rooms.context'
import {  useLocation, Link } from 'react-router-dom'

import { Routes,Route } from 'react-router-dom'
import Chatcol from '../../pages/Home/Chatcol'
const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

const ChatRoomList = ({aboveElHeight}) => {
  const rooms=useRooms();
  const location=useLocation();
    return <Nav
  appearance='subtle'
  vertical
  reversed
  className='overflow-y-scroll custom-scroll'
 style={{
    height:`calc(100% - ${aboveElHeight}px)`
 }}
 activeKey={location.pathname}
 >
    {!rooms && (<Loader center vertical content="Loading" speed="slow" size="md"/> )}
    {rooms&& rooms.length>0 && rooms.map(room=>(
      <Link to={`/chat/${room.id}`} >
    <RoomItem room={room}/> 

</Link> 

    ))}
    

  </Nav>
   
}

export default ChatRoomList
