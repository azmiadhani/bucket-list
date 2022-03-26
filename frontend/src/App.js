import { Routes, Route } from 'react-router-dom';
import Preload from './components/Preload/Preload';
import Layout from './components/Layout/Layout';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Home/Home';

function App() {
  return (
    <Routes>
      {/* Routes for Layout Component for Layouting */}
      <Route element={<Preload />}>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>

          {/* Protected routes */}
          {/* All of the routes inside RequireAuth Route protected by RequireAuth */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/bucketlist" element={<Home />}></Route>
          </Route>

          {/* catch all a.k.a 404 page */}
          <Route path="*" element={<div>404</div>}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
