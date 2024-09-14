import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";

import { CreateProdact } from "../../components";
import Edit from "../../components/Modals/Edit";

import { fetchGetCategory, fetchGetSubcategory } from "../Home/HomeSlice";

import styles from "./Admin.module.css";
import { fetchGetAllUsers, showOrders, showReport } from "./AdminSlice";
import {
  fetchGetAdminGetAll,
  getOrderStatus,
  search,
} from "../PersonalOffice/PersonalOfficeSlice";

const Admin = () => {
  const [modalEditCategoryActive, setModalEditCategoryActive] = useState(false);
  const [modalProdactActive, setModalProdactActive] = useState(false);
  const [isShowUsers, setIsShowUsers] = useState(false);
  const [visibleAdimList, setVisibleAdimList] = useState(false);

  console.log(visibleAdimList);

  const isLogout = useSelector((state) => state.auth.isLogout);
  const isShowOrders = useSelector((state) => state.admin.isShowOrders);
  const isShowReport = useSelector((state) => state.admin.isShowReport);
  const count = useSelector((state) => state.admin.users.count);
  const users = useSelector((state) => state.admin.users.rows);
  const limit = useSelector((state) => state.office.limit);
  const page = useSelector((state) => state.office.page);
  const orderStatus = useSelector((state) => state.office.orderStatus);

  const dispatch = useDispatch();

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
    dispatch(showOrders(false));
    dispatch(showReport(false));
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
    setIsShowUsers(false);
    setVisibleAdimList(false);
  };

  const editCategoryHandler = () => {
    setModalEditCategoryActive(true);
    dispatch(showOrders(false));
    dispatch(showReport(false));
    dispatch(fetchGetCategory());
    dispatch(fetchGetSubcategory());
    setIsShowUsers(false);
  };

  const getAllOrdersHandler = () => {
    dispatch(showOrders(true));
    dispatch(showReport(false));
    setVisibleAdimList(false);
    dispatch(fetchGetAdminGetAll({ page, limit, status: orderStatus }));
    dispatch(search(false));
    dispatch(getOrderStatus(""));
  };

  const reportHandler = () => {
    dispatch(showOrders(false));
    dispatch(showReport(true));
  };

  const getUsersHandler = () => {
    dispatch(showOrders(false));
    dispatch(showReport(false));
    setIsShowUsers(true);
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
            <h4 className={styles.optionsTitle}>Доступні опції</h4>
            <Link to=".">
              <p onClick={editCategoryHandler}>
                Редагувати категорії\підкатегорії
              </p>
            </Link>
            <Link to=".">
              <p onClick={prodactHandler}>Додати продукт</p>
            </Link>

            <Link to="users">
              <p onClick={getUsersHandler}>Мої клієнти</p>
            </Link>

            <Link to="orders">
              <p onClick={getAllOrdersHandler}> Замовлення </p>
            </Link>

            <Link to="report">
              <p onClick={reportHandler}>Звіт за новими замовленнями</p>
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

      {!isShowOrders && !isShowReport && !isShowUsers ? (
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
