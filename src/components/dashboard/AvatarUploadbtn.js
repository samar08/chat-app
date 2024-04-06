import React, { useState,useRef } from 'react'
import { Modal,Button } from 'rsuite'
import { useModalState } from '../../misc/customhooks'
import AvatarEditor from 'react-avatar-editor'
import { storage ,database} from '../../misc/firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage';
import {child,set,ref as lref,update} from 'firebase/database';
import { useProfile } from '../../context/profile.context'
import '../../styles/style.css';
import ProfileAvatar from '../ProfileAvatar'
import { getUserUpdate } from '../../misc/helpers'

const fileInputTypes=".png, .jpeg, .jpg"
const acceptedFileTypes=['image/png', 'image/jpeg', 'image/pjpeg']
const isValidFile=(file)=> acceptedFileTypes.includes(file.type)
const getBlob=(canvas)=>{
    return new Promise((resolve,reject)=>{
        canvas.toBlob((blob)=>{
            if(blob){
                resolve(blob);
            }
            else{
                reject(new Error('File process error'));
            }
        })
    })
}
const AvatarUploadbtn = () => {
    const {profile} =useProfile();
    const {isOpen,open,close}=useModalState()
    const [img, setImg] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const avatarEditorRef=useRef();
    const onFileInputChange= (ev)=>{
        const currFiles=ev.target.files;
        if(currFiles.length===1){
            const file=currFiles[0];
            if(isValidFile(file)){
                setImg(file);
                open();
            }
            else{
                alert(`wrong file type ${file.type}`)
            }
        }
    }
    const onUploadClick= async ()=>{
        const canvas = avatarEditorRef.current.getImageScaledToCanvas();
        setIsLoading(true);
        try{
           const blob = await getBlob(canvas);
            const avatarFileRef=ref(storage,`/profiles/${profile.uid}/avatar`)
            // const uploadAvatarResult = await avatarFileRef.put(blob,{
            //     cacheControl: `public, max-age=${3600 * 24  * 3}`
            // });
            uploadBytes(avatarFileRef,blob).then((snap)=>{
                console.log("Uploaded the avatar")
               // setIsLoading(false);
                // const downloadUrl=await uploadAvatarResult.ref.getDownloadURL()
                getDownloadURL(avatarFileRef).then((url)=>{
                    // const userAvatarRef=child(lref(database,(`/profiles/${profile.uid}`)),'avatar');
                    // set(userAvatarRef,url);
                 
                    // alert('Avatar has been uploaded');
                    // setIsLoading(false);
                    const updates= getUserUpdate(profile.uid,'avatar', url,database);
                    update(ref(database),updates);
                   }).catch((err)=>{
                  setIsLoading(false);
                        console.log(err)
                   }); 
            });
            //setIsLoading(false);

            

           
           

        }
        catch(err){
            setIsLoading(false)
            console.log(err)
        }
    }
  return (
    <div className='mt-3 text-center'>
        <ProfileAvatar src={profile.avatar}/>
      <div>
       <label htmlFor="avatar-upload" className='d-block cursor-pointer padded'>
        Select new Avatar
        <input id="avatar-upload" type="file" className='d-none' accept={fileInputTypes} onChange={onFileInputChange}/>
       </label>
       <Modal open={isOpen} onClose={close}>
        <Modal.Header>
            <Modal.Title>
                Adjust and upload new avatar
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          <div className='d-flex justify-content-center align-items-center h-100'>
              
       {img && <AvatarEditor
       ref={avatarEditorRef}
       image={img}
      width={200}
      height={200}
      border={10}
      borderRadius={100}
      rotate={0}
    
       />}
    </div>
        </Modal.Body>
        <Modal.Footer>
        <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
            Upload new Avatar
        </Button>

        </Modal.Footer>
       </Modal>
      </div>
    </div>
  )
}

export default AvatarUploadbtn
