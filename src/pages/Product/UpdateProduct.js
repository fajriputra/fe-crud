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
      <div className="wrapper">
        <form>
          <div style={{ marginBottom: 10, fontWeight: 600, letterSpacing: 2 }}>
            UPDATE PRODUCT
          </div>
          <div style={{ marginBottom: 10, paddingRight: 10 }}>
            <label>Nama Produk </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>

          <div style={{ marginBottom: 10, paddingRight: 10 }}>
            <label>Keterangan </label>
            <input
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
            {" "}
            <label>Jumlah </label>
            <input
              type="number"
              size={30}
              value={product.stock}
              onChange={(e) => handleChange(e, "stock")}
            />
          </div>

          <div style={{ marginBottom: 10, paddingRight: 10 }}>
            {" "}
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
            update
          </button>
        </form>
      </div>
    </>
  );
};

export default Update;
