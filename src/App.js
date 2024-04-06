
import React from 'react';
import '../src/styles/main.scss'

import {BrowserRouter,Routes, Route} from 'react-router-dom'
import 'rsuite/dist/rsuite.min.css';
import Signin from './pages/signin';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import { RoomsProvider } from './context/rooms.context';
import Chatcol from './pages/Home/Chatcol';
function App() {
  return (
    <ProfileProvider>
      <RoomsProvider>
    <BrowserRouter>
  <Routes>
    <Route path="/signin" element={<PublicRoute/>}>
      <Route path="/signin" element={<Signin/>}/>
    </Route>
    <Route path="/" element={<PrivateRoute/>}>
     <Route path="/" element={<Home/>}/>
    </Route >
    <Route path="/chat/:chatId" element={<Chatcol/>}></Route>
    </Routes>  
    </BrowserRouter>
    </RoomsProvider>
    </ProfileProvider>
  );
}
export default App;
