import React from 'react'
import { Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../context/profile.context'
import '../../styles/style.css'
import EditableInput from '../EditableInput'
import { database } from '../../misc/firebase'
import { ref,child,set, update } from 'firebase/database'
import ProviderBlock from './ProviderBlock'
import AvatarUploadbtn from './AvatarUploadbtn';
import { getUserUpdate } from '../../misc/helpers'
const Dashboard = ({onsignout}) => {
  const {profile}=useProfile()
  const onSave= async (newdata)=>{
    //console.log(newdata);
    //const userNickameRef=child(ref(database,`/profiles/${profile.uid}`),'name')
    try{
     // await set(userNickameRef,newdata);
     // alert('Nickname has been updated');

      const updates=await getUserUpdate(profile.uid,'name', newdata,database);
      update(ref(database),updates);
    }
    catch(err){
      alert(err);
    }
  
  }
  return <>
  <Drawer.Header>
    <Drawer.Title>
      Dashboard
    </Drawer.Title>
    <Drawer.Actions>
    <Button appearance="primary" color="red" className="redbackground" onClick={onsignout}>
Sign out 
</Button>
    </Drawer.Actions>
  </Drawer.Header>
  <Drawer.Body>
  <h3>Hey, {profile.name}</h3>
  <ProviderBlock/>
 <Divider/>
 <EditableInput name="nickname" initialvalue={profile.name}  onSave={onSave} label={<h6 className='mb-2'>Nickname</h6>} />
<AvatarUploadbtn/>
  </Drawer.Body>
  
  </>
}

export default Dashboard
