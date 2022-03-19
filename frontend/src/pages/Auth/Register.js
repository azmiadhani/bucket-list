import './Auth.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
// axios importing
import axios from '../../api/axios';
const REGISTER_URL = '/api/auth/signup';

const Register = () => {
  // state management for form input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  // state for error message
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorObject, setErrorObject] = useState(null);
  // state for navigating
  const [navigate, setNavigate] = useState(false);

  // handling form submit
  const handleSubmit = async (e) => {
    // prevent submit reload event
    e.preventDefault();

    var tempErrorObject = [];

    // rePassword extra validation
    if (!rePassword) {
      tempErrorObject.rePassword = 'Please enter your re-typed password';
    }
    if (password !== rePassword) {
      tempErrorObject.rePassword =
        'Password and Re-type Password are not the same';
    }

    // send request to the api
    const response = await axios
      .post(
        REGISTER_URL,
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(function (response) {
        // handle success
        const accessToken = response?.data?.accessToken;
        const refreshToken = response?.data?.refreshToken;
        setNavigate(true);
      })
      .catch(function (err) {
        // handle error
        let resErrorMessage = err?.response?.data?.error?.message;
        let resErrorObject = err?.response?.data?.error?.errors;
        setErrorMessage(resErrorMessage ? resErrorMessage : 'Unexpected Error');
        console.log(tempErrorObject);
        if (resErrorObject) {
          Object.entries(resErrorObject).forEach(([key, value]) => {
            tempErrorObject[key] = value;
          });
        }
        console.log(tempErrorObject);
        setErrorObject(tempErrorObject);
      })
      .then(function () {
        // always executed
      });
  };

  // if navigate is true, redirect to login page
  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        <div className="form-floating">
          {/* Input and Label*/}
          <input
            type="email"
            className={
              'form-control' + (errorObject?.email ? ' is-invalid' : '')
            }
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
          {/* Validation text */}
          <div className="invalid-feedback">
            {errorObject?.email && errorObject?.email}
          </div>
        </div>

        <div className="form-floating">
          {/* Input and Label*/}
          <input
            type="password"
            className={
              'form-control' + (errorObject?.password ? ' is-invalid' : '')
            }
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
          {/* Validation text */}
          <div className="invalid-feedback">
            {errorObject?.password && errorObject?.password}
          </div>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className={
              'form-control' + (errorObject?.rePassword ? ' is-invalid' : '')
            }
            placeholder="Re-type Password"
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <label htmlFor="floatingRetypePassword">Re-type Password</label>
          <div className="invalid-feedback">
            {errorObject?.rePassword && errorObject?.rePassword}
          </div>
        </div>

        {/* submit button */}
        <button className="mt-4 w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
        {errorMessage && (
          <p className="mt-2 error-message text-center">{errorMessage}</p>
        )}
      </form>
    </main>
  );
};

export default Register;
