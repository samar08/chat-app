import React,{useState} from 'react'
import { auth } from '../../misc/firebase'
import { Tag,Button } from 'rsuite'
import { FaGoogle } from "react-icons/fa";
import {FaFacebook} from "react-icons/fa";
import firebase from 'firebase/app';
import {GoogleAuthProvider, FacebookAuthProvider,linkWithPopup } from 'firebase/auth'
import '../../styles/style.css';
const ProviderBlock = () => {
  const [isConnected,setIsConnected]=useState({
    'google.com':auth.currentUser.providerData.some((data)=> data.providerId === 'google.com'),
    'facebook.com':auth.currentUser.providerData.some((data)=> data.providerId === 'facebook.com')
})

const updateIsConnected = (providerId,value)=>{
    setIsConnected(p=>{
        return{
            ...p,
            [providerId]:value,
        }
    })
}
const unlink= async (providerId)=>{
try{
if(auth.currentUser.providerData.length==1){
    throw new Error(`You cannot disconnect from ${providerId}`)
}
await auth.currentUser.unlink(providerId)
updateIsConnected(providerId, false);
alert(`Disconnected from ${providerId}`);

}
catch(err){
alert(err.message);
}
}
const unlinkFacebook=()=>{
    unlink('facebook.com')
}
const unlinkGoogle=()=>{
    unlink('google.com')
}
const link = (provider)=>{
    try{
        linkWithPopup(auth.currentUser,provider).then((result)=>{
            updateIsConnected(provider.providerId,true);
        }).catch((error)=>{
            console.log(error);
        })

    }
    catch(err){
        alert(err.message);
    }

}
const linkFacebook=()=>{
 link(new FacebookAuthProvider())
}
const linkGoogle=()=>{
    link(new GoogleAuthProvider())
}
  
    return (
    <div>
        {
            isConnected['google.com'] &&(
<Tag color="orange" closable onClose={unlinkGoogle} >
        <p><FaGoogle/>
       Connected</p>
    </Tag>
            )
        }
    
    {
        isConnected['facebook.com'] && (
            <Tag color="blue" closable onClose={unlinkFacebook}>
        <FaFacebook/>
        Connected
    </Tag>
        )
    }
    
    <div className='mt-2'>
       {!isConnected['google.com'] && (<Button block color="orange" className="orangebtn" onClick={linkGoogle}>
            <FaGoogle/> Link to google
        </Button>)
        }

       {!isConnected['facebook.com'] &&  (<Button block color="blue" className="bluebtn" onClick={linkFacebook}>
            <FaFacebook/> Link to facebook
        </Button>)}
    </div>
    </div>
  )
}

export default ProviderBlock
