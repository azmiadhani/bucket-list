import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

const Header = () => {
  const [refreshToken, setRefreshToken] = useState(null);
  const { auth } = useContext(AuthContext);
  // todo : do token check here, if token exist, then hide login and register, show logout
  return (
    <header className="p-3 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <span className="fs-4">Bucketlist</span>
      </a>
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          {/* To use Link comoponent, "to" attribute is what route the link pointing to */}
          <Link to="/" className="nav-link px-2 link-secondary">
            Home
          </Link>
        </li>
      </ul>

      <div className="col-md-3 text-center">
        {refreshToken ? (
          <Link to="/register" className="btn btn-primary">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
