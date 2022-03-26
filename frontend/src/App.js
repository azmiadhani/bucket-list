import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Layout from './components/Layout/Layout';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Home/Home';
import PersistLogin from './components/PersistLogin/PersistLogin';

function App() {
  return (
    <Routes>
      {/* Routes for Layout Component for Layouting */}
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>

        {/* Protected routes */}
        {/* All of the routes inside RequireAuth Route protected by RequireAuth */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/bucketlist" element={<Home />}></Route>
          </Route>
        </Route>

        {/* catch all a.k.a 404 page */}
        <Route path="*" element={<div>404</div>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
