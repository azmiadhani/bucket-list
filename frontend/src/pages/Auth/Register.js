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

  const [navigate, setNavigate] = useState(false);

  // handling form submit
  const handleSubmit = async (e) => {
    // prevent submit reload event
    e.preventDefault();

    // todo : check if password and re-password is same

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
      .catch(function (error) {
        // todo : handle error
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
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Re-type Password"
            onChange={(e) => setRePassword(e.target.value)}
          />
          <label htmlFor="floatingRetypePassword">Re-type Password</label>
        </div>

        <button className="mt-4 w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
      </form>
    </main>
  );
};

export default Register;
