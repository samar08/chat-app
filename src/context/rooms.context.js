import React,{ createContext, useEffect, useState,useContext } from "react";
import { ref,off , onValue} from "firebase/database";
import { database } from "../misc/firebase";
import { transformToArrWithId } from "../misc/helpers";
// import firebase from "firebase/compat/app";
// import "firebase/compat/database";
import { DateRangeInput } from "rsuite";
const RoomsContext=createContext();
export const RoomsProvider = ({children})=>{
    const [rooms, setRooms]=useState(null);
        let data=null;
        // const firebaseConfig = {
        //     apiKey: "AIzaSyBD6m7Lv3gUfuxcxzA_W_w3OTOhHU5lu4E",
        //     authDomain: "chat-app-d15ea.firebaseapp.com",
        //     databaseURL: "https://chat-app-d15ea-default-rtdb.firebaseio.com",
        //     projectId: "chat-app-d15ea",
        //     storageBucket: "chat-app-d15ea.appspot.com",
        //     messagingSenderId: "46517526525",
        //     appId: "1:46517526525:web:a2a4a5f43bc49f5ec3c394"
        //   };
        //   firebase.initializeApp(firebaseConfig);
        // let database=firebase.database();
    useEffect(()=>{
        const roomListRef = ref(database,'rooms')
        onValue(roomListRef,(snap)=>{
            data=transformToArrWithId(snap.val());
            setRooms(data);
            //   console.log('data', data);
            //   console.log('rooms',rooms);  
        });
        

        return ()=>{
            off(roomListRef);
        }
    },[]);

    // useEffect(()=>{
    //     const roomListRef=database.ref('rooms')
    //     roomListRef.on('value',(snap)=>{
    //        // console.log('snap.val',snap.val());
    //         const data=transformToArrWithId(snap.val());
    //         setRooms(data);
    //         //console.log(rooms);
    //     })

    //     return ()=>{
    //         roomListRef.off();
    //     }
    // },[])
    return <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
}

export const useRooms = ()=>useContext(RoomsContext);