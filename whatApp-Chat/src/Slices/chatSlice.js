import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { store } from "../firebase/firebase"
import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc
} from "firebase/firestore"

// fetch messages (once)
export const chatFecht = createAsyncThunk("chat/fetch", async (chatId) => {
  const querySnapshot = await getDocs(collection(store, "chats", chatId, "messages"));
  return querySnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
});

// send message
export const createChat = createAsyncThunk(
  "chat/createChat",
  async ({ chatId, message }) => {
    const msgId = Date.now().toString(); // unique id
    await setDoc(doc(store, "chats", chatId, "messages", msgId), {
      ...message,
      createdAt: new Date().toISOString(),
    });
    return { id: msgId, ...message };
  }
);

// edit message
export const editChat = createAsyncThunk(
  "chat/editChat",
  async ({ chatId, id, data }) => {
    await updateDoc(doc(store, "chats", chatId, "messages", id), data);
    return { id, ...data };
  }
);

// delete message
export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async ({ chatId, id }) => {
    await deleteDoc(doc(store, "chats", chatId, "messages", id));
    return id;
  }
);

const initialState = {
  isLoding: false,
  error: null,
  chats: [],
  activeChat: null
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
      state.chats = []; // reset messages when switching chat
    },
    closeChat: (state) => {
      state.activeChat = null;
      state.chats = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createChat.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoding = false;
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state) => {
        state.error = "chat is not sent!";
        state.isLoding = false;
      })
      // fetch
      .addCase(chatFecht.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(chatFecht.fulfilled, (state, action) => {
        state.chats = action.payload;
        state.isLoding = false;
      })
      .addCase(chatFecht.rejected, (state) => {
        state.error = "Can't fetch chats!";
        state.isLoding = false;
      })
      .addCase(deleteChat.pending,(state)=>{
         state.isLoding=true;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        const id = action.payload;
        state.chats = state.chats.filter((c) => c.id !== id);
        state.isLoding = false;
      })
      .addCase(deleteChat.rejected,(state)=>{
         state.error="Chat not Delete...!"
         state.isLoding=false;
      })
      .addCase(editChat.pending,(state)=>{
         state.isLoding=true;
      })
      .addCase(editChat.fulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        const chat = state.chats.find((c) => c.id === id);
        if (chat) {
          Object.assign(chat, changes);
        }
        state.isLoding = false;
      })
      .addCase(editChat.rejected,(state)=>{
         state.error="chat this a not Edit..!"
         state.isLoding=false
      });
  }
});

export default chatSlice.reducer;
export const { setActiveChat, closeChat } = chatSlice.actions;
