import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, editProduct } from "../../Slices/productsSlice";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.products);

  const [form, setForm] = useState({ title: "", category: "", price: "" });

  const categories = [
    "Electronics","Furniture","Footwear","Accessories","Mobiles",
    "Home Appliances","Kitchen","Stationery","Musical Instruments","Sports",
    "Cosmetics","Clothing","Living Room","Bedroom","Vehicles",
    "Audio","Fashion","Kids","Photography","Kitchen Appliances"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await dispatch(fetchProductById(id)).unwrap();
        setForm({
          title: product.title,
          category: product.category,
          price: product.price,
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchData();
  }, [dispatch, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editProduct({ id, updatedData: { ...form, price: Number(form.price) } })).unwrap();
      alert("Product updated successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to update product: " + err.message);
    }
  };

  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-white ${isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
        >
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
