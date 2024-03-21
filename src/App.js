
import React from 'react';
import '../src/styles/main.scss'

import {BrowserRouter,Routes, Route} from 'react-router-dom'
import 'rsuite/dist/rsuite.min.css';
import Signin from './pages/signin';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
function App() {
  return (
    <ProfileProvider>
    <BrowserRouter>
  <Routes>
    <Route path="/signin" element={<PublicRoute/>}>
      <Route path="/signin" element={<Signin/>}/>
    </Route>
    <Route path="/" element={<PrivateRoute/>}>
     <Route path="/" element={<Home/>}/>
    </Route >
    </Routes>  
    </BrowserRouter>
    </ProfileProvider>
  );
}
export default App;
