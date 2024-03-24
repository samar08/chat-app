import React from 'react'

import { Grid,Row,Col } from 'rsuite'
import Sidebar from "../../components/Sidebar"
import { RoomsProvider } from '../../context/rooms.context'
import { Route, Routes,BrowserRouter } from 'react-router-dom'
import Chatcol from './Chatcol'
const Home = () => {
  return (
    <RoomsProvider>
   <Grid fluid className='h-100'>
    <Row className='h-100'>
    <Col xs={24} md={8} className='h-100'>
      <Sidebar/>
    </Col>
    
    <Routes>
      <Route path='/chat/:chatId' element={<Chatcol/>}>
      
      </Route>
    </Routes>
   
   
    </Row>
     
   </Grid>
   </RoomsProvider>
  )
}

export default Home
