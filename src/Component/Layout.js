import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="main">
      <Outlet />
    </div>
  );
};

export default Layout;
