import React,{ createContext ,useState, useContext,useEffect} from "react";
import {auth,database} from '../misc/firebase';
import { ref as rRef,onValue ,off} from "firebase/database";
const Profilecontext=createContext();
export const ProfileProvider=({children})=>{
    const [profile,setProfile]=useState(null);
    const [isLoading, setIsLoading]=useState(true);
    let Ref;
    useEffect(()=>{
        const authUnsub=auth.onAuthStateChanged(authObj=>{
            if(authObj){
                Ref=rRef(database,`/profiles/${authObj.uid}`)
               onValue(Ref,(snapshot)=>{
                
                    const {name,avatar}= snapshot.val();
                    const data={
                        name,
                        avatar,
                        uid: authObj.uid,
                        email:authObj.email
                    }
                   // console.log(data)
                    setProfile(data);
                    setIsLoading(false);
               });
          
                
            }
            else{
                if(Ref){
                   off(Ref);
                }
             setProfile(null);   
             setIsLoading(false);
            }
        });
        return ()=>{
            authUnsub();
            if(Ref){
                off(Ref);
            }
        }
    },[]);
    return <Profilecontext.Provider value={{isLoading, profile}}>
        {children}
    </Profilecontext.Provider>
}
export const useProfile=()=>useContext(Profilecontext)