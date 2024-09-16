import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./hoc/Layuot/MainLayout";
import {
  AdminOrderList,
  ForgotPassword,
  Order,
  Profile,
  UserOrderList,
} from "./components";
import {
  Admin,
  Auth,
  Basket,
  Checkout,
  Home,
  PersonalOffice,
  Prodact,
  Report,
  Users,
} from "./pages";

import { fetchAutoLogin, fetchGetGoogleUser } from "./pages/Auth/AuthSlice";
import { fetchGetBasket } from "./pages/Basket/BasketSlice";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(!token);
    if (!!token) dispatch(fetchAutoLogin());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) dispatch(fetchGetGoogleUser());
  }, [dispatch, isAuth]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    !!user.id
      ? dispatch(fetchGetBasket(user.id))
      : dispatch(fetchGetBasket({ userId: null }));
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="basket" element={<Basket />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order" element={<Order />} />
          <Route path="office/*" element={<PersonalOffice />}>
            <Route path="orders" element={<UserOrderList />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="prodact/:id" element={<Prodact />} />
          <Route path="auth" element={<Auth />} />
          <Route path="resetpassword/:link" element={<ForgotPassword />} />
          <Route path="admin/" element={<Admin />}>
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<AdminOrderList />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
