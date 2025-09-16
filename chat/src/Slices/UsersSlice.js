import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import { collection,getDocs } from "firebase/firestore" 
import { store } from "../firebase/firebase"

const initialState={
    usres:[],
    isLoading:true,
    error:null,
}

//fetch user
    const fetchUser=createAsyncThunk("Usre-fetch",async()=>{
        const querSnapshot= await getDocs(collection(store,"usres"));
        const users=querSnapshot.map((doc)=>doc.data)

        return users
    })

const userSlice=createSlice({
    name:"usres",
    initialState,
    reducers:{},
    extraReducers:(buildr)=>{
        buildr.addCase(fetchUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(fetchUser.fulfilled,(state,action)=>{
            state.usres=action.payload,
            state.isLoading=false
        }).addCase(fetchUser.rejected,(state,)=>{
            state.error="Cant fetch users !!";
        })
    }
})

export default userSlice.reducer

