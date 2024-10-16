
import "./App.css";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import AddNewProduct from "./pages/AddNewProduct";
import UpdateProduct from "./pages/UpdateProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/products"} />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/new" element={<AddNewProduct />} />
        <Route path="/edit-product/:id" element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
