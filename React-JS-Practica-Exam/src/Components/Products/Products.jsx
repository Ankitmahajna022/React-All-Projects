import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../Slices/productsSlice";
import "./Products.css"; 

function Products() {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.title.localeCompare(b.title);
      if (sortBy === "name-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products-container">
      <h2 className="products-title">Products Table</h2>

      <div className="products-controls">
        <a href="/add">Add</a>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="none">Sort By</option>
          <option value="price-asc">Price (Low → High)</option>
          <option value="price-desc">Price (High → Low)</option>
          <option value="name-asc">Name (A → Z)</option>
          <option value="name-desc">Name (Z → A)</option>
        </select>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No products found
              </td>
            </tr>
          ) : (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td className="price">₹ {product.price}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => dispatch(deleteProduct(product.id))}
                      className="btn btn-delete"
                    >
                      Delete
                    </button>
                    <a href={`/edit/${product.id}`} className="btn btn-edit">
                      Edit
                    </a>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
