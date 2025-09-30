import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ProductsURL = "http://localhost:3000/products";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get(ProductsURL);
  return res.data;
});


export const addProduct = createAsyncThunk("products/add", async (product) => {
  const res = await axios.post(ProductsURL, product);
  return res.data;
});

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await axios.delete(`${ProductsURL}/${id}`);
  return id;
});

export const fetchProductById = createAsyncThunk("products/fetchById", async (id) => {
  const res = await axios.get(`${ProductsURL}/${id}`);
  return res.data;
});

export const editProduct = createAsyncThunk("products/edit", async ( id) => {
  const res = await axios.put(`${ProductsURL}/${id}`,{
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
});

const initialState = {
  products: [],
  isLoading: true,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Data not Fonud....!";
      })
      .addCase(addProduct.pending,(state)=>{
        state.isLoading=true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.isLoading=false
    }).addCase(addProduct.rejected,(state)=>{
        state.isLoading=false
        state.error="Data Not Add...!"
    })
    .addCase(deleteProduct.pending,(state)=>{
        state.isLoading=true
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload)
      state.isLoading=false
    })
    .addCase(deleteProduct.rejected,(state)=>{
        state.error="Data Not a Delete...!"
        state.isLoading=false
    })
    .addCase(editProduct.pending,(state)=>{
        state.isLoading=false
    })
    .addCase(editProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    })
    .addCase(editProduct.rejected,(state)=>{
        state.error="Data Not a Edit....!"
    })
  },
});

export default productSlice.reducer;
