import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

import { CreateProdact } from "../../components";
import Edit from "../../components/Modals/Edit";

import { fetchGetCategory, fetchGetSubcategory } from "../Home/HomeSlice";

import styles from "./Admin.module.css";
import { fetchGetAllUsers } from "./AdminSlice";
import {
  fetchGetAdminGetAll,
  getOrderStatus,
  search,
} from "../PersonalOffice/PersonalOfficeSlice";

const Admin = () => {
  const [modalEditCategoryActive, setModalEditCategoryActive] = useState(false);
  const [modalProdactActive, setModalProdactActive] = useState(false);
  const [visibleAdimList, setVisibleAdimList] = useState(false);

  const isLogout = useSelector((state) => state.auth.isLogout);
  const count = useSelector((state) => state.admin.users.count);
  const users = useSelector((state) => state.admin.users.rows);
  const limit = useSelector((state) => state.office.limit);
  const page = useSelector((state) => state.office.page);
  const orderStatus = useSelector((state) => state.office.orderStatus);

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchGetSubcategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (visibleAdimList) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [visibleAdimList]);

  const prodactHandler = () => {
    setModalProdactActive(true);
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
    setVisibleAdimList(false);
  };

  const editCategoryHandler = () => {
    setModalEditCategoryActive(true);
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
  };

  const getAllOrdersHandler = () => {
    setVisibleAdimList(false);
    dispatch(fetchGetAdminGetAll({ page, limit, status: orderStatus }));
    dispatch(search(false));
    dispatch(getOrderStatus(""));
  };

  const showAdminList = (e) => {
    e.stopPropagation();
    setVisibleAdimList(true);
  };

  return !isLogout ? (
    <section className={styles.adminWrapper}>
      <div
        className={
          !visibleAdimList
            ? styles.containerAdmin
            : `${styles.containerAdmin} ${styles.containerAdminCover}`
        }
        onClick={() => setVisibleAdimList(false)}
      >
        <div className={styles.adminOptions}>
          <div
            className={
              !visibleAdimList
                ? `${styles.listLeft} ${styles.adminOptionsContainer}`
                : `${styles.listRight} ${styles.adminOptionsContainer}`
            }
            onClick={(e) => showAdminList(e)}
          >
            <Link to=".">
              <h4 className={styles.optionsTitle}>Доступні опції</h4>
            </Link>
            <Link to=".">
              <p onClick={editCategoryHandler}>
                Редагувати категорії\підкатегорії
              </p>
            </Link>
            <Link to=".">
              <p onClick={prodactHandler}>Додати продукт</p>
            </Link>

            <Link to="users">
              <p>Мої клієнти</p>
            </Link>

            <Link to="orders">
              <p onClick={getAllOrdersHandler}> Замовлення </p>
            </Link>

            <Link to="report">
              <p>Звіт за новими замовленнями</p>
            </Link>
          </div>

          <Edit
            active={modalEditCategoryActive}
            setActive={() => setModalEditCategoryActive(false)}
          />
          <CreateProdact
            active={modalProdactActive}
            setActive={() => setModalProdactActive(false)}
          />
        </div>
      </div>

      {pathname === "/admin" ? (
        <div className={styles.adminInfo}>
          <div className={styles.infoItem}>
            <p>Клієнтів</p>
            <p>{count}</p>
          </div>
          <div className={styles.infoItem}>
            <p>Замовлень</p>
            {users?.reduce((acc, item) => acc + item.orders.length, 0)}
          </div>
          <div className={styles.infoItem}>
            <p>На сумму</p>
            <p>
              {users?.reduce(
                (acc, item) =>
                  acc +
                  item.orders.reduce(
                    (acc, order) => acc + Number(order.amount),
                    0
                  ),
                0
              )}
              грн
            </p>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </section>
  ) : (
    <Navigate to="/" />
  );
};

export default Admin;
