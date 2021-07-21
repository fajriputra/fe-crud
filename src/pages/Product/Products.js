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
    if (window.confirm("produk ini mau dihapus?")) {
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
      {product && (
        <>
          <div className="wrapper">
            <div
              style={{ marginBottom: 10, fontWeight: 600, letterSpacing: 2 }}
            >
              SINGLE PRODUCT
            </div>
            <div className="single-product">Nama Produk : {product.name}</div>
            <div className="single-product">
              Keterangan : {product.description}
            </div>
            <div className="single-product">Harga : {product.price}</div>
            <div className="single-product">Jumlah : {product.stock}</div>
            <div className="single-product">
              Status : {product.status ? "on" : "off"}
            </div>
            <button onClick={() => history.push("/product")} className="btn">
              back
            </button>
            <button onClick={() => handleDelete(product._id)} className="btn">
              delete
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Products;
