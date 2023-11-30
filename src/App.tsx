import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Login/Login";
import Sign_up from "./components/Sign_up";
import Products from "./components/Products/Products";
import AddProduct from "./components/AddProduct/AddProduct";
import Product from "./components/Product/Product";
import EditProduct from "./components/EditProduct/EditProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/erp/Sign_up" element={<Sign_up />} />

       

          <Route path="/erp" element={<Layout />}>
            <Route path="/erp/Products" element={<Products />} />

            <Route path="/erp/Product/:id" element={<Product />} />
            <Route path="/erp/AddProduct" element={<AddProduct />} />
            <Route path="/erp/EditProduct/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
