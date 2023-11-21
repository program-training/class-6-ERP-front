import { Outlet } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Layout = () => {
  return (
    <div>

      <Header/>
        <Outlet />
        <Footer/>

    </div>
  );
};

export default Layout;