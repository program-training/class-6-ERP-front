import "./App.css";
// import { GlobalState } from "./state";
// import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Sign_up from "./components/Sign_up";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import EditProduct from "./components/EditProduct";
// import Product from "./pages/Product";
// import Products from "./pages/Products";
// import Login from "./pages/Login";
// import Sign from "./pages/Sign";
// import Cart from "./pages/Cart";
// import Compare from "./pages/Compare";
// import { useSelector } from "react-redux";
// import IsraelMap from "./pages/Map";

function App() {
  // Assuming that your state structure has a "global" property
  // const data = useSelector((state: { global: GlobalState }) => state.global.products);
  // console.log(data);

  return (
    <div>
      <BrowserRouter>
        {/* <CssBaseline /> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>} />
            <Route path="/Sign_up" element={<Sign_up />} />
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