import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
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
import OrderDetail from "./components/dashboard/OrderDetail";
import {useEffect} from "react";
import Chat from "./components/dashboard/Chat";
import ConfirmOrder from "./pages/ConfirmOrder";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:category" element={<CategoryShop />} />
        <Route path="/products/search?" element={<SearchProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/confirm?" element={<ConfirmOrder />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/details/:slug" element={<DetailProduct />} />
        <Route path="/dashboard" element={<ProtectUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Index />}></Route>
            <Route path="my-orders" element={<Orders />}></Route>
            <Route
              path="order/details/:orderId"
              element={<OrderDetail />}
            ></Route>
            <Route path="my-wishlist" element={<Wishlist />}></Route>
            <Route path="change-password" element={<ChangePassword />}></Route>
            <Route path="chat" element={<Chat />}></Route>
            <Route path="chat/:sellerId" element={<Chat />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
