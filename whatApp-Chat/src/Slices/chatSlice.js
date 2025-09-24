import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { store } from "../firebase/firebase"
import {setDoc,doc} from "firebase/firestore"




//chat fecht
//chat send
 export const createChat=createAsyncThunk("create-chat", async()=>{
    await setDoc(doc(store,"chatroom","admin1@gamil.com"),{
        sender:"admin1@gamil.com"
    })
 })
 

// chat edit
// chat delete

 const initaliState={
    isLoding:true,
    error:null,
    chat:[]
 }

const chatSlice= createSlice({
   name:"chats",
   initialState:initaliState,
   reducers:{},
   extraReducers:(builder)=>{

   }
})

export default chatSlice.reducer