import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { store } from "../firebase/firebase"
import { doc, addDoc, collection, getDocs, deleteDoc, updateDoc } from "firebase/firestore"




//chat fecht
export const chatFecht = createAsyncThunk("fachat-chat", async () => {
   const querSnapshot = await getDocs(collection(store, "chats"))
   const chats = querSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
   }))
   return (chats)
})
//chat send
export const createChat = createAsyncThunk("create-chat", async ({ sender, chats }) => {
   const chatRef = await addDoc(collection(store, sender), chats);
   return { id: chatRef.id, ...chats };
})

// chat edit
export const editChat = createAsyncThunk("edit-chat", async ({ id, data }) => {
   await updateDoc(doc(store, "chats", id), data);
   return { id, ...data };
});
// chat delete
const deleteChat = createAsyncThunk("delete-chat", async (id) => {
   await deleteDoc(doc(store, "chats", id))
   return id

})
const initaliState = {
   isLoding: true,
   error: null,
   chats: []
}

const chatSlice = createSlice({
   name: "chats",
   initialState: initaliState,
   reducers: {
      setActiveChat: (state, action) => {
         state.activeChat = action.payload;
      },
      closeChat: (state) => {
         state.activeChat = null;
      }
   },
   extraReducers: (builder) => {
      builder.addCase(createChat.pending, (state) => {
         state.isLoding = true;
      })
         .addCase(createChat.fulfilled, (state, action) => {
            state.isLoding = false;
            state.isLoading = false;
            state.chats.push(action.payload);
         })
         .addCase(createChat.rejected, (state) => {
            state.error = "chat is not send..!";
            state.isLoding = false;
         })
         .addCase(chatFecht.pending, (state) => {
            state.isLoding = true;
         })
         .addCase(chatFecht.fulfilled, (state, action) => {
            state.chats = action.payload;
            state.isLoding = false;
         })
         .addCase(chatFecht.rejected, (state) => {
            state.error = "Cant fetch chats !!";   
            state.isLoding = false;
         })
         .addCase(deleteChat.pending, (state) => {
            state.isLoding = true;
         })
         .addCase(deleteChat.fulfilled, (state, action) => {
            state.isLoding = false;
            const id = action.payload
            state.chats = state.chats.filter((chats) => chats.id != id)
         })
         .addCase(editChat.pending, (state) => {
            state.isLoding = true;
         })
         .addCase(editChat.fulfilled, (state, action) => {
            state.isLoding = true;
            const { id, ...change } = action.payload;
            const chat = state.chats.find(c => c.id === id)
            if (chat) {
               Object.assign(chat, change)
            }
         })
         .addCase(editChat.rejected, (state) => {
            state.error = "chat Not Updata...!!"
            state.isLoding = false;
         })
   }
})

export default chatSlice.reducer
export const { setActiveChat, closeChat } = chatSlice.actions;