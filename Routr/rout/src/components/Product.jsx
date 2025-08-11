import { useEffect, useState } from "react";
import axios from "axios";
import Cadr from "./Cadr";

function Product() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch data
  const GetdataFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProducts(response.data);
      localStorage.setItem("productData", JSON.stringify(response.data)); 
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const savedData = localStorage.getItem("productData");
    if (savedData) {
      setProducts(JSON.parse(savedData));
    } else {
      GetdataFromServer();
    }
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Search by title
    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by price
    filtered.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(filtered);
  }, [search, sortOrder, products]);

  // Delete handler
  const handleDelete = (id) => {
    const updated = products.filter((product) => product.id !== id);
    setProducts(updated);
    localStorage.setItem("productData", JSON.stringify(updated)); // Update localStorage
  };

  return (
    <>
      <h1>Products</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "10px", padding: "5px", width: "200px" }}
      />

      {/* Sort */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ margin: "10px", padding: "5px" }}
      >
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      {/* Product Grid */}
      <div
        className="container"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}
      >
        {filteredProducts.map((el) => (
          <Cadr {...el} key={el.id} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}

export default Product;
