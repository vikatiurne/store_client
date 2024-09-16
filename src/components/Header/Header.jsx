import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

import logo from "../../assets/cake_logo.png";

import styles from "./Header.module.css";
import Button from "../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../../pages/Auth/AuthSlice";
import { getTotalPrice, resetBasket } from "../../pages/Basket/BasketSlice";

const Header = () => {
  const [visibitityBurgerList, setVisibilityBurgetList] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const price = useSelector((state) => state.basket.totalPrice);
  const orders = useSelector((state) => state.basket.order);


  const dispatch = useDispatch();
  

  useEffect(() => {
    if (!!orders.length) {
      const total = Math.round(
        orders
          .map(
            (item) =>
              item.basket_prodact.qty * (item.price / parseInt(item.sizes[0]))
          )
          .reduce((acc, val) => acc + val, 0)
      );
      dispatch(getTotalPrice(total));
    } else {
      dispatch(getTotalPrice(0));
    }
  }, [orders, dispatch]);

  const logoutHandler = () => {
    dispatch(fetchLogout());
    dispatch(resetBasket());
    setVisibilityBurgetList(false);
  };

  const showBurgerList = () => {
    setVisibilityBurgetList((prev) => !prev);
  };

  return (
    <>
      <div className={styles.logoWrapper}>
        <Button className={styles.basket}>
          {!isAuth ? (
            <>
              <Link to="auth">
                <p>Вхід</p>
              </Link>
              <span />
            </>
          ) : (
            <>
              <p onClick={logoutHandler}>Вихід</p>
              <span />
            </>
          )}
          {!isAuth ? (
            <IoPerson className={styles.basketIcon} />
          ) : (
            <>
              {user.role === "ADMIN" ? (
                <Link to="admin">Адмін</Link>
              ) : (
                <Link to="office/orders">{user.name}</Link>
              )}
            </>
          )}
        </Button>

        <Link to="/">
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
            <div className={styles.logoName}>
              <h1>Yummy</h1>
              <p>найсмачніщі солодощі в світі</p>
            </div>
          </div>
        </Link>
        <Link to="basket">
          <div className={styles.basket}>
            <p>{price} ₴</p>

            <span />
            <div className={styles.basketInfo}>
              <MdShoppingCart className={styles.basketIcon} />
              <p>{orders ? orders.length : 0}</p>
            </div>
          </div>
        </Link>

        <RxHamburgerMenu
          className={styles.burgerHeader}
          onClick={() => showBurgerList()}
        />
      </div>
      {visibitityBurgerList && (
        <div className={styles.burgerList}>
          {isAuth && (
            <>
              {user.role === "ADMIN" ? (
                <Link to="admin" onClick={() => setVisibilityBurgetList(false)}>
                  Адмінкабінет
                </Link>
              ) : (
                <Link
                  to="office/orders"
                  onClick={() => setVisibilityBurgetList(false)}
                >
                  Мої замовлення
                </Link>
              )}
              <Link
                to="/office/profile"
                onClick={() => setVisibilityBurgetList(false)}
              >
                Мій профіль
              </Link>
            </>
          )}

          <Link to="basket" onClick={() => setVisibilityBurgetList(false)}>
            Кошик
          </Link>

          {!isAuth ? (
            <Link to="auth">Вхід</Link>
          ) : (
            <p onClick={logoutHandler}>Вихід</p>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
