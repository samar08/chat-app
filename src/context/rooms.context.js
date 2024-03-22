import React,{ createContext, useEffect, useState,useContext } from "react";
import { ref,off , onValue} from "firebase/database";
import { database } from "../misc/firebase";
import { transformToArrWithId } from "../misc/helpers";
const RoomsContext=createContext();
export const RoomsProvider = ({children})=>{
    const [rooms, setRooms]=useState(null);
    useEffect(()=>{
        const roomListRef = ref(database,'rooms')
        onValue(roomListRef,(snap)=>{
            const data=transformToArrWithId(snap.val());
              setRooms(data);
              console.log('data', data);
              console.log(rooms);
        });

        return ()=>{
            off(roomListRef);
        }
    },[]);
    return <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
}

export const useRooms = ()=>useContext(RoomsContext);