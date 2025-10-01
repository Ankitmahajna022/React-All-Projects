import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, } from "firebase/firestore"
import { store, auth } from "../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { data } from "react-router-dom"



//signUpUser

const signUpUser = async (email, password) => {
    const userCreate = await createUserWithEmailAndPassword(auth, email, password)

    const user = {
        email: userCreate.user.email,
        displayName: userCreate.user.displayName,
        image: userCreate.user.photoURL
    }
    return user
}

//signInUser
export const signInUser = createAsyncThunk(
    "user/signInUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    currentUser: {},
    users: [],
    isLoading: true,
    error: null,
}

//fetch user
export const fetchUser = createAsyncThunk("Usre-fetch", async () => {
    const querSnapshot = await getDocs(collection(store, "users"));
    const users = querSnapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id
        }
    })
    return users


})

// add user
export const addUser = createAsyncThunk("User-add", async ({ email, password, name }) => {
    const user = await signUpUser(email, password);

    if (user) {
        const docRef = await addDoc(collection(store, "users"), {
            email: email,
            password: password,
            name: name,
        })
        return { id: docRef.id, name: name, email: email, password: password };
    }
    return null;
});

//updata user
const updataUser = createAsyncThunk("updata-user", async ({ id, data }) => {
    updateDoc(doc(store, "users", id), data)

    return { id, ...data }
})

//delete user
export const deleteUser = createAsyncThunk("User-delete", async (id) => {
    await deleteDoc(doc(store, "users", id))
    return id;
})


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.currentUser = null;
        },
    },
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
                const user = action.payload
                state.currentUser = user;
                state.users.push(user);
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
            .addCase(signInUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.isLoading= false;
                state.currentUser = action.payload;
            })
            .addCase(signInUser.rejected, (state) => {
                state.isLoading = false;
                state.error = "User not Find...!"
            })
            .addCase(updataUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updataUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const { id, ...change } = action.payload;
                const user = state.users.find(c => c.id === id);
                if (user) {
                    Object.assign(user, change);
                }
            })
            .addCase(updataUser.rejected, (state) => {
                state.error = "User not Updata....!!";
                state.isLoading = false;
            });
    }
})

export default userSlice.reducer

