import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Slices/productsSlice";
import { useNavigate } from "react-router-dom";
import "./AddProducts.css"

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...form, price: Number(form.price) }));
    navigate("/");
  };

  return (
    <div className="add-product-container">
  <h2>Add New Product</h2>
  <form onSubmit={handleSubmit} className="add-product-form">
    <div className="form-group">
      <label>Title</label>
      <input type="text" name="title" value={form.title} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label>Category</label>
      <input type="text" name="category" value={form.category} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label>Price</label>
      <input type="number" name="price" value={form.price} onChange={handleChange} required />
    </div>
    <button type="submit">Add Product</button>
  </form>
</div>

  );
}

export default AddProduct;
