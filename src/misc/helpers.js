import { ref,orderByChild ,query, equalTo,onValue} from "firebase/database";
export function transformToArrWithId(snapval){
    return snapval? Object.keys(snapval).map(roomId=>{
        return {...snapval[roomId], id: roomId}
    }):[];
}

export async function getUserUpdate(userId, keyToUpdate, value, database){
    const updates={};
    updates[`/profiles/${userId}/${keyToUpdate}`]=value;
    onValue(query(ref(database,'/messages'),orderByChild('author/uid'),equalTo(userId)),(snapshot)=>{
        snapshot.forEach(msgsnap=>{
            updates[`/messages/${msgsnap.key}/author/${keyToUpdate}`]=value
        })

    },{
        onlyOnce:true
    })

    onValue(query(ref(database,'/rooms'),orderByChild('lastMessage/author/uid'),equalTo(userId)),(snapshot)=>{
       snapshot.forEach(roomsnap=>{
        updates[`/rooms/${roomsnap.key}/lastMessage/author/${keyToUpdate}`]=value;
       })

    },{
        onlyOnce:true
    })
 return updates;
}