import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { store } from "../firebase/firebase"
import {setDoc,doc,addDoc,collection} from "firebase/firestore"




//chat fecht
//chat send
 export const createChat=createAsyncThunk("create-chat", async()=>{
   const chatRef= await addDoc(collection(store,""))
      setDoc(doc(chatRef,"chats"))
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