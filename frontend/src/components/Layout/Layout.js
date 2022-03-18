import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

// @desc    Layout Component for Layouting
const Layout = () => {
  return (
    <div className="App">
      {/* Default Header */}
      {/* <Navbar /> */}
      {/* Bootstrap Header */}
      <Header />
      <div className="content">
        {/* Outlet component represent all the children of Layout Component */}
        {/* Anything nested inside the Layout component is represented by Outlet Component */}
        {/* This allow us to apply more thing to overall app */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
