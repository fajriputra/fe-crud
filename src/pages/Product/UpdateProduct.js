import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { apiHost } from "../../config";
import axios from "axios";

const Update = () => {
  const history = useHistory();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 1,
    status: true,
  });

  useEffect(() => {
    const updateProduct = async () => {
      try {
        const res = await axios.get(`${apiHost}/product/${productId}`);

        const { status, message, data } = res.data;

        if (status === "success") {
          setProduct(data);
        } else {
          alert(message);
        }
      } catch (err) {
        alert(err);
      }
    };
    updateProduct();
  }, [productId]);

  const handleChange = (e, name) => {
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${apiHost}/product/${productId}`, product);

      console.log(res);

      const { status, message } = res.data;

      if (status === "success") {
        alert(message);
        history.push("/product");
      } else {
        alert(message);
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return (
    <>
      <h2>Halaman Form Update Product</h2>

      <form>
        <label>Nama Produk </label>
        <input
          type="text"
          size={50}
          value={product.name}
          onChange={(e) => handleChange(e, "name")}
        />

        <label>Keterangan </label>
        <input
          type="text"
          size={50}
          value={product.description}
          onChange={(e) => handleChange(e, "description")}
        />

        <label>Harga </label>
        <input
          type="number"
          value={product.price}
          onChange={(e) => handleChange(e, "price")}
        />

        <label>Jumlah </label>
        <input
          type="number"
          size={30}
          value={product.stock}
          onChange={(e) => handleChange(e, "stock")}
        />

        <label>Status </label>
        <select
          value={product.status}
          onChange={(e) => handleChange(e, "status")}
        >
          <option value={false}>off</option>
          <option value={true}>on</option>
        </select>

        <label></label>
        <button onClick={handleSubmit}> update </button>
      </form>

      <button onClick={() => history.push("/product")}> &laquo; back </button>
    </>
  );
};

export default Update;
