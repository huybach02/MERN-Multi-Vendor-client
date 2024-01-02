import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Shipping from "./pages/Shipping";
import CategoryShop from "./pages/CategoryShop";
import SearchProduct from "./pages/SearchProduct";
import Payment from "./pages/Payment";
import ProtectUser from "./utils/ProtectUser";
import Dashboard from "./pages/Dashboard";
import Index from "./components/dashboard/Index";
import Orders from "./components/dashboard/Orders";
import Wishlist from "./components/dashboard/Wishlist";
import ChangePassword from "./components/dashboard/ChangePassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:category" element={<CategoryShop />} />
          <Route path="/products/search?" element={<SearchProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product/details/:slug" element={<DetailProduct />} />
          <Route path="/dashboard" element={<ProtectUser />}>
            <Route path="" element={<Dashboard />}>
              <Route path="" element={<Index />}></Route>
              <Route path="my-orders" element={<Orders />}></Route>
              <Route path="my-wishlist" element={<Wishlist />}></Route>
              <Route
                path="change-password"
                element={<ChangePassword />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
