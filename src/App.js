import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './features/Login/Login.jsx';
import Dashboard from './features/dashboard/dashboard';
import Product from './features/product/Product';
import Customer from './features/customer/Customer';
import Orders from './features/orders/Orders';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
