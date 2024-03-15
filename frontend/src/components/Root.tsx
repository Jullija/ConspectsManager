import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Root = () => {
  return (
    <>
      <Navbar />
      <div style={{ margin: 20 }}>
        <Outlet />
      </div>
    </>
  );
};

export default Root;
