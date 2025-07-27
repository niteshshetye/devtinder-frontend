import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 w-full">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
