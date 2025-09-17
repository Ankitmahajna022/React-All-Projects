import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { store } from "../firebase/firebase"

const initialState = {
    usres: [],
    isLoading: true,
    error: null,
}

//fetch user
const fetchUser = createAsyncThunk("Usre-fetch", async () => {
    const querSnapshot = await getDocs(collection(store, "users"));
    const users = querSnapshot.map((doc) => doc.data)

    return users
})

// add user
const addUser = createAsyncThunk("User-add", async (email, password, name) => {
    const docRef = await addDoc(collection(store, "users"), {
        email: email,
        password: password,
        name: name,
    })
    return docRef
})

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (buildr) => {
        buildr.addCase(fetchUser.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchUser.fulfilled, (state, action) => {
            state.usres = action.payload,
                state.isLoading = false
        }).addCase(fetchUser.rejected, (state) => {
            state.error = "Cant fetch users !!";
            state.isLoading=false;
        }).addCase(addUser.pending,(state)=>{
            state.isLoading=true
        }).addCase(addUser.fulfilled,(state,action)=>{
            const id=action.payload.id
            const user=action.payload.data();

            state.usres.push({"user-id":id,...user})
            state.isLoading=false
        }).addCase(addUser.rejected,(state,action)=>{
            state.error="geting error while add user !"
            state.isLoading=false
        })
    }
})

export default userSlice.reducer

