import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchUserGetAll } from "../PersonalOffice/PersonalOfficeSlice";

import { spinners } from "../../components/UI/Spinner/Spiner";

import orderImg from "../../assets/order.png";
import profileImg from "../../assets/profile.png";
import styles from "./PersonalOffice.module.css";
import { fetchGetUser } from "../Auth/AuthSlice";

const PersonalOffice = () => {
  const [activeBtn, setActiveBtn] = useState("");
  const [img, setImg] = useState(orderImg);

  const isLogout = useSelector((state) => state.auth.isLogout);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.office.status);
  const limit = useSelector((state) => state.office.limit);
  const page = useSelector((state) => state.office.page);

  const dispatch = useDispatch();

  const path = useLocation().pathname;

  useEffect(() => {
    const activePage = path.slice(path.lastIndexOf("/") + 1);
    activePage === 'orders' ? setImg(orderImg) : setImg(profileImg)
    setActiveBtn(activePage)
  }, [path]);

  useEffect(() => {
      dispatch(fetchUserGetAll({ id: user.id, page, limit }));
  }, [dispatch, user, page, limit, activeBtn]);

  const clickOrderBtnHandler = () => {
    setActiveBtn("orders");
    setImg(orderImg);
  };
  const clickProfileBtnHandler = () => {
    setActiveBtn("profile");
    setImg(profileImg);
    dispatch(fetchGetUser());
  };

  return (
    <div className={styles.officeWrapper}>
      <aside className={styles.officeBtn}>
        <Link to="orders">
          <p
            className={
              activeBtn !== "orders"
                ? `${styles.button} ${styles.bottomOrderBtn}`
                : `${styles.activeBtn} ${styles.topBtn}`
            }
            onClick={clickOrderBtnHandler}
          >
            Замовлення
          </p>
        </Link>

        <Link to="profile">
          <p
            className={
              activeBtn !== "profile"
                ? `${styles.button} ${styles.bottomBtn}`
                : `${styles.activeBtn} ${styles.topProfileBtn}`
            }
            onClick={clickProfileBtnHandler}
          >
            Профіль
          </p>
        </Link>
      </aside>
      <div className={styles.officeMain}>
        {activeBtn === "orders" ? <h1>Замовлення</h1> : <h1>Профіль</h1>}
        <div className={styles.officeContainer}>
          {status !== "success" ? (
            spinners.threeDots()
          ) : !isLogout ? (
            <Outlet />
          ) : (
            <Navigate to="/" />
          )}
          <img className={styles.img} src={img} alt='img' />
        </div>
      </div>
    </div>
  );
};

export default PersonalOffice;
