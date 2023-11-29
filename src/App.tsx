import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Login";
import Sign_up from "./components/Sign_up";
import Products from "./components/Products/Products";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import EditProduct from "./components/EditProduct";



function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route index element={<Home/>} />
        <Route path="/Sign_up" element={<Sign_up />} />

          <Route path="/" element={<Layout />}>
          <Route path="/Products" element={<Products />} />

            <Route path="/Product/:id" element={<Product />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/EditProduct/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;