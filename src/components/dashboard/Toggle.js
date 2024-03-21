import React, { useCallback } from 'react'
//import 'rsuite/styles/index.less'
import '../../styles/style.css';
import { Button, Drawer} from 'rsuite'
import {  Icon } from '@rsuite/icons'
import DashboardIcon from '@rsuite/icons/Dashboard';
import { useModalState } from '../../misc/customhooks'
import Dashboard from '.'
import { useMediaQuery } from '../../misc/customhooks';
import { signOut } from 'firebase/auth';
import {auth} from '../../misc/firebase';
const Toggle = () => {
  const {isOpen, close, open}=useModalState()
  const ismobile=useMediaQuery('(max-width: 992px)');
  const onsignout=useCallback(()=>{
    auth.signOut();
  //alert("signed out");
  close();
  //  signOut(auth).then(()=>{
  //   alert("signed out");
  //  }).catch((error)=>{
  //   console.log(error);
  //  });
    
  },[close])
  return (
    <>
      <Button className="dashboardbtn" block="true" color="blue" onClick={open}>
       <DashboardIcon/> Dashboard
      </Button>
      <Drawer size={ismobile?'full':'md'} open={isOpen} onClose={close} placement='left'>
    <Dashboard onsignout={onsignout}/>
      </Drawer>
    </>
  )
}

export default Toggle
