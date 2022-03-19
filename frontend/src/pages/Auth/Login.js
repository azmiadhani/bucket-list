import './Auth.css';
import { useState, useContext } from 'react';
import axios from '../../api/axios';
import AuthContext from '../../context/AuthProvider';

const Login = () => {
  // AuthProvider state so that we can access it in this component
  const { setAuth } = useContext(AuthContext);
  // state management for form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // state for error message
  const [errorMessage, setErrorMessage] = useState(null);
  // state for navigating
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // reset error message
    setErrorMessage(null);
    // send request to the api
    axios
      .post(
        '/api/auth/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(function (response) {
        // handle success
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        setAuth({ accessToken, refreshToken });
        setNavigate(true);
      })
      .catch(function (error) {
        // handle error
        if (error.response.data.error.message) {
          setErrorMessage(error.response.data.error.message);
        }
      })
      .then(function () {
        // always executed
      });
  };

  // todo : handle navigate if login success

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="mt-4 w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
        {errorMessage && (
          <p className="mt-2 error-message text-center">{errorMessage}</p>
        )}
      </form>
    </main>
  );
};

export default Login;
