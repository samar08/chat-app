import React from 'react'
import firebase from 'firebase/app'
import '../styles/style.css'
import { Col, Container, Grid, Row,Panel , Button, } from 'rsuite'
import { Icon } from '@rsuite/icons'
import { FaGoogle } from "react-icons/fa";
import {FaFacebook} from "react-icons/fa";
import { auth,database } from '../misc/firebase'
import {ref,set} from 'firebase/database'
import { signInWithPopup,GoogleAuthProvider, FacebookAuthProvider,getAdditionalUserInfo } from 'firebase/auth'
const Signin = () => {
  
  const signinwithprovider=  (provider)=>{
  
  signInWithPopup(auth, provider).then(
    (result)=>{
      const user=result.user
      const additionaluserinfo = getAdditionalUserInfo(result);
      console.log(user)
      console.log(database)
      if(additionaluserinfo.isNewUser===true){
        console.log("inside ")
       
         set(ref(database,`/profiles/${user.uid}`),{
          name:user.displayName
         });

      }
     
       
    }
  ).catch((error)=>{
    
    console.log("Error")
    console.log(error)
  })
  }
  const onFacebooksignin=()=>{
    const provider=new FacebookAuthProvider();
        signinwithprovider(provider)
  }
  const ongooglesignin=()=>{
    const provider = new GoogleAuthProvider();
      signinwithprovider(provider)
  }
  return (
   <center><Container className="centercontainer">    
      <Grid>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
          <Panel>
            <div >
              <h2>
                Welcome to chat </h2>
                <p>Progressive chat platform</p>
             
            </div>
            <center><div>
              <Button block className='bluebtn' onClick={onFacebooksignin}>
                {/* <SocialIcon network='facebook'/> */}
               
                <FaFacebook/>
                Continue with facebook
                
              </Button>
              <Button block className="orangebtn" onClick={ongooglesignin}>
              {/* <SocialIcon network='google'/> */}
              <FaGoogle />
              Continue with google
              </Button>
            </div>
            </center>
          </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
    </center>
  )
}

export default Signin
