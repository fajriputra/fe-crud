import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiHost } from "../../config";

const ListProduct = () => {
  // untuk menampung data dari list product
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(`${apiHost}/product`);

        const { status, message, data } = res.data;
        if (status === "success") {
          setProducts(data);
        } else {
          alert(message);
        }
      } catch (error) {
        alert(error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <Link to="/product/create">+ TAMBAH PRODUK</Link>

      <table>
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Keterangan</th>
            <th>Harga</th>
            <th>Jumlah</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products?.map((product) => {
              return (
                <tr key={product._id}>
                  <td className="center">
                    <Link to={`/product/single/${product._id}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td className="center">{product.description}</td>
                  <td className="center">{product.price}</td>
                  <td className="center">{product.stock}</td>
                  <td className="center">
                    <Link to={`/product/update/${product._id}`}> update </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ListProduct;
