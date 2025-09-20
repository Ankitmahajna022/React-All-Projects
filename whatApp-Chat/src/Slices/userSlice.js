import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs, addDoc, deleteDoc, doc, } from "firebase/firestore"
import { store,auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"



//signUpUser

const signUpUser = async (email, password ) => {
    const userCreate = await createUserWithEmailAndPassword(auth, email, password)
    return userCreate.user
}

//signInUser
 export const signInUser=createAsyncThunk("signInUser",async({email,password})=>{

    console.log("chek-2")
     const userCredential=await signInWithEmailAndPassword(auth,email,password);

     const user={
        email:userCredential.user.email,
        displayName:userCredential.user.displayName,
        image:userCredential.user.photoURL,
     }

     return user;
    })

const initialState = {
    currentUser: {},
    users: [],
    isLoading: true,
    error: null,
}

//fetch user
const fetchUser = createAsyncThunk("Usre-fetch", async () => {
    const querSnapshot = await getDocs(collection(store, "users"));
    const users = querSnapshot.docs.map((doc) => doc.data)

    return users
})

// add user
const addUser = createAsyncThunk("User-add", async ({email, password, name}) => {
    const user= await signUpUser(email,password);

    if(user)
    {
         const docRef = await addDoc(collection(store, "users"), {
        email: email,
        password: password,
        name: name,
    })
    return docRef;
    }
   return null;
});

//updata user
const updataUser = () => { }

//delete user
const deleteUser = createAsyncThunk("User-delete", async (id) => {
    deleteDoc(doc(store, "users", id))
    return id
})


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (buildr) => {
        buildr.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchUser.rejected, (state) => {
            state.error = "Cant fetch users !!";
            state.isLoading = false;
        })
        .addCase(addUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            const id = action.payload.id;
            const user = action.payload.data();
            state.currentUser = { "user-id": id, ...user };
            state.usres.push({ "user-id": id, ...user });
            state.isLoading = false;
        })
        .addCase(addUser.rejected, (state) => {
            state.error = "geting error while add user !";
            state.isLoading = false;
        })
        .addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            const id = action.payload;
            state.users = state.users.filter((user) => user.id != id);
            state.isLoading = false;
        })
            .addCase(deleteUser.rejected, (state) => {
            state.error = "geting error white deleting user...";
            state.isLoading = false;
        })
        .addCase(signInUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(signInUser.fulfilled,(state,action)=>{
            const user=action.payload;
            console.log("chek-3")
            state.currentUser=state.users.find(
                (value)=>value.email==user.email
            );
            state.isLoading=false;
            
            
        })
        .addCase(signInUser.rejected,(state)=>{
            state.isLoading=false;
            state.error="User not Find...!"
        });
    }
})

export default userSlice.reducer

