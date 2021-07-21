import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiHost } from "../../config";
import axios from "axios";

const CreateProduct = () => {
  const history = useHistory();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 1,
    status: true,
  });

  const handleChange = (e, name) => {
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiHost}/product`, product);

      const { status, message } = res.data;

      if (status === "success") {
        alert(message);
        history.push("/product");
      } else {
        alert(message);
      }
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <>
      <div className="wrapper">
        <form>
          <div style={{ marginBottom: 10, fontWeight: 600, letterSpacing: 2 }}>
            CREATE PRODUCT
          </div>
          <div style={{ marginBottom: 10, paddingRight: 10 }}>
            <label>Nama Produk </label>
            <input
              placeholder="Masukan nama produk"
              type="text"
              value={product.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>

          <div style={{ marginBottom: 10, paddingRight: 10 }}>
            <label>Keterangan </label>
            <input
              placeholder="Masukan keterangan produk"
              type="text"
              value={product.description}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>

          <div style={{ marginBottom: 10, paddingRight: 10 }}>
            <label>Harga </label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => handleChange(e, "price")}
            />
          </div>

          <div style={{ marginBottom: 10, paddingRight: 10 }}>
            <label>Jumlah </label>
            <input
              type="number"
              value={product.stock}
              onChange={(e) => handleChange(e, "stock")}
            />
          </div>

          <div style={{ marginBottom: 10, paddingRight: 10 }}>
            <label>Status </label>
            <select
              value={product.status}
              onChange={(e) => handleChange(e, "status")}
            >
              <option value={false}>off</option>
              <option value={true}>on</option>
            </select>
          </div>

          <button onClick={() => history.push("/product")} className="btn">
            back
          </button>
          <button onClick={handleSubmit} className="btn">
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
