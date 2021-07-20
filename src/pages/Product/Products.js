import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { apiHost } from "../../config";
import axios from "axios";

const Products = () => {
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
    const getSingleProduct = async () => {
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
    getSingleProduct();
  }, [productId]);

  const handleDelete = async (id) => {
    if (window.confirm("yakin mau dihapus?")) {
      try {
        const response = await axios.delete(`${apiHost}/product/` + id);

        const { message } = response.data;

        alert(message);

        history.push("/product");
      } catch (error) {
        alert("Network error");
      }
    }
  };

  return (
    <>
      <h2>Halaman Single Product</h2>
      {product && (
        <>
          <div>Name : {product.name}</div>
          <div>Price : {product.price}</div>
          <div>Stock : {product.stock}</div>
          <div>Status : {product.status ? "on" : "off"}</div>
          <button onClick={() => handleDelete(product._id)}> delete </button>
        </>
      )}
      <button onClick={() => history.push("/product")}> &laquo; back </button>
    </>
  );
};

export default Products;
