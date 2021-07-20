import React from "react";

const Home = React.lazy(() => import("./pages/Home"));
const ListProduct = React.lazy(() => import("./pages/Product/ListProduct"));
const Product = React.lazy(() => import("./pages/Product/Products"));
const CreateProduct = React.lazy(() => import("./pages/Product/CreateProduct"));
const UpdateProduct = React.lazy(() => import("./pages/Product/UpdateProduct"));

const routes = [
  { path: "/product/single/:productId", Component: Product },
  { path: "/product/create", Component: CreateProduct },
  { path: "/product/update/:productId", Component: UpdateProduct },
  { path: "/product", Component: ListProduct },
  { path: "/", Component: Home },
];

export default routes;
