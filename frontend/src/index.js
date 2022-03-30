import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// react-toastfy
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* everything inside this provider will have access to context */}
      <AuthProvider>
        <Routes>
          {/* routes handled inside the App Component */}
          <Route path="/*" element={<App />} />
        </Routes>
        {/* container for react-toastify, only declare once, best at root */}
        <ToastContainer position="top-right" hideProgressBar={false} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
