import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Home/Home';

function App() {
  return (
    <Routes>
      {/* Routes for Layout Component for Layouting */}
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>

        {/* Protected routes */}
        <Route path="/" element={<Home />}></Route>

        {/* catch all a.k.a 404 page */}
        <Route path="*" element={<div>404</div>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
