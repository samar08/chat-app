import React from 'react'
import { Navigate,Route,Routes,Outlet } from 'react-router-dom'
import { Container,Loader } from 'rsuite'
import { useProfile } from '../context/profile.context'

const PrivateRoute = ({children, ...routeProps}) => {
    const {isLoading, profile }=useProfile();
    if(isLoading && !profile){
        return <Container>
          <Loader center vertical size="md" content="Loading" speed="slow" />
        </Container>
    }
    if(!profile && !isLoading){
      return <Navigate to="/signin" />
    }
  return (
    
    <Outlet/>
    
  )
}

export default PrivateRoute
