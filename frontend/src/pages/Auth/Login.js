import './Auth.css';
import { useState } from 'react';
import axios from '../../api/axios';
// import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import TokenService from '../../services/Token';

const Login = () => {
  // AuthProvider state so that we can access it in this component
  // const { setAuth } = useAuth();

  // to navigate to another page
  const navigate = useNavigate();
  // to get the current location
  const location = useLocation();
  // get where user came from, if empty then redirect to home page
  const from = location.state?.from?.pathname || '/';

  // state management for form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // state for error message
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorObject, setErrorObject] = useState(null);
  // reset error state
  const resetError = () => {
    setErrorMessage(null);
    setErrorObject(null);
  };
  // handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();
    // rePassword extra validation
    var tempErrorObject = [];
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
        console.log(response);
        console.log('then');
        // handle success
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        TokenService.storeToken(accessToken, refreshToken);
        // navigate to
        navigate(from, { replace: true });
      })
      .catch(function (err) {
        // handle error
        let resErrorMessage = err?.response?.data?.error?.message;
        let resErrorObject = err?.response?.data?.error?.errors;
        setErrorMessage(resErrorMessage ? resErrorMessage : 'Unexpected Error');
        if (resErrorObject) {
          Object.entries(resErrorObject).forEach(([key, value]) => {
            tempErrorObject[key] = value;
          });
        }
        setErrorObject(tempErrorObject);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className={
              'form-control' + (errorObject?.email ? ' is-invalid' : '')
            }
            id="floatingInput"
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
          <div className="invalid-feedback">
            {errorObject?.email && errorObject?.email}
          </div>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className={
              'form-control' + (errorObject?.password ? ' is-invalid' : '')
            }
            id="floatingPassword"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
          <div className="invalid-feedback">
            {errorObject?.password && errorObject?.password}
          </div>
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
