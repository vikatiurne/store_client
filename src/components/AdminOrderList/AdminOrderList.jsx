import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { MdKeyboardDoubleArrowUp } from "react-icons/md";

import DateServices from "../../utils/DateServices";
import OrderStatusServices from "../../utils/OrderStatusServices";

import styles from "../ControlPanel/ControlPanel.module.css";
import {
  fetchAdminGetOne,
  fetchGetAdminGetAll,
  fetchUpdateStatus,
  hideDetail,
} from "../../pages/PersonalOffice/PersonalOfficeSlice";
import { useEffect, useState } from "react";
import PaginationOrder from "../PaginationOrder/PaginationOrder";
import ErrModal from "../../components/Modals/ErrModal";
import ControlPanel from "../ControlPanel/ControlPanel";

const AdminOrderList = () => {
  const [modalActive, setModalActive] = useState(false);

  const status = useSelector((state) => state.office.status);
  const order = useSelector((state) => state.office.order);
  const isDetail = useSelector((state) => state.office.isDetail);
  const limit = useSelector((state) => state.office.limit);
  const page = useSelector((state) => state.office.page);
  const orderStatus = useSelector((state) => state.office.orderStatus);
  const orders = useSelector((state) => state.office.userOrders);
  const isSearch = useSelector((state) => state.office.isSearch);
  const err = useSelector((state) => state.office.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAdminGetAll({ page, limit, status: orderStatus }));
  }, [dispatch, page, limit, orderStatus, orders.status]);

  useEffect(() => {
    if (!!err) setModalActive(true);
  }, [err]);

  const clickModalHandler = () => setModalActive(false);

  const clickOrderAdminHandler = (id) => {
    dispatch(fetchAdminGetOne(id));
  };
  const changeStatusHandler = (id, status) => {
    dispatch(fetchUpdateStatus({ id, status }));
  };
  const hideDetailHandler = () => {
    dispatch(hideDetail());
  };

  const render = (
    <div className={styles.orderWrapper}>
      <ControlPanel />

      {!isSearch ? (
        <div className={styles.orderContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>№ замовлення</th>
                <th>Статус</th>
                <th>Дата</th>
              </tr>
            </thead>

            {!!orders.length &&
              orders.map((item, i) => (
                <tbody key={uuidv4()}>
                  <tr className={styles.orderList}>
                    <td>{i + 1}</td>
                    <td onClick={() => clickOrderAdminHandler(item.id)}>
                      №{item.createdAt.substring(0, 10)}_{item.id}
                      {/* №{item.id} */}
                    </td>
                    <td>
                      <select
                        name="statusList"
                        className={styles.orderSelect}
                        onChange={(e) =>
                          changeStatusHandler(item.id, e.target.value)
                        }
                      >
                        <option>
                          {OrderStatusServices.getStatusName(item.status)}
                        </option>
                        <option value="0">нове</option>
                        <option value="1">в роботі</option>
                        <option value="2">готове</option>
                        <option value="3">виконане</option>
                      </select>
                    </td>

                    <td>
                      <p>{DateServices.getDate(item.createdAt)}</p>
                      {item.status !== 0 && (
                        <p className={styles.updateText}>
                          {DateServices.getUpdate(item.updatedAt)}
                        </p>
                      )}
                    </td>
                  </tr>

                  {isDetail && item.id === order.id && (
                    <tr>
                      <td colSpan="4">
                        <div className={styles.detail}>
                          <p>
                            {order.address === "Самовивіз"
                              ? order.address
                              : `Доставка за адресою ${order.address}`}
                            <span>
                              {DateServices.transformDate(order.readinessfor)}
                            </span>
                          </p>
                          <p>Загальна сума: {order.amount}грн</p>
                          {order.comment ? (
                            <p>Коментарій: {order.comment}</p>
                          ) : null}
                          {order.items.map((prodact) => (
                            <div key={uuidv4()} className={styles.detailItem}>
                              <p>{prodact.name}</p>
                              <p>-</p>
                              <p>{prodact.qty}</p>
                            </div>
                          ))}
                          <button
                            onClick={hideDetailHandler}
                            className={styles.hideDetail}
                          >
                            <MdKeyboardDoubleArrowUp />
                            <p>приховати деталі</p>
                            <MdKeyboardDoubleArrowUp />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              ))}
          </table>
        </div>
      ) : (
        <div className={styles.orderContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>№ замовлення</th>
                <th>Статус</th>
                <th>Дата</th>
              </tr>
            </thead>

            {status === "success" && (
              <tbody>
                <tr className={styles.orderList}>
                  <td>{1}</td>

                  <td onClick={() => clickOrderAdminHandler(order.id)}>
                    №{order.createdAt?.substring(0, 10)}_{order.id}
                  </td>

                  <td>
                    <select
                      name="statusList"
                      className={styles.orderSelect}
                      onChange={(e) =>
                        changeStatusHandler(order.id, e.target.value)
                      }
                    >
                      <option disabled>
                        {OrderStatusServices.getStatusName(order.status)}
                      </option>
                      <option value="0">нове</option>
                      <option value="1">в роботі</option>
                      <option value="2">готове</option>
                      <option value="3">виконане</option>
                    </select>
                  </td>

                  <td>
                    <p>{DateServices.getDate(order.createdAt)}</p>
                    {order.status !== 0 && (
                      <p className={styles.updateText}>
                        {DateServices.getUpdate(order.updatedAt)}
                      </p>
                    )}
                  </td>
                </tr>
                {isDetail && (
                  <tr>
                    <td colSpan="4">
                      <div className={styles.detail}>
                        <p>
                          {order.address === "Самовивіз"
                            ? order.address
                            : `Доставка за адресою ${order.address}`}
                          <span>
                            {DateServices.transformDate(order.readinessfor)}
                          </span>
                        </p>
                        <p>Загальна сума: {order.amount}грн</p>
                        {order.comment ? (
                          <p>Коментарій: {order.comment}</p>
                        ) : null}
                        {order.items.map((prodact) => (
                          <div key={uuidv4()} className={styles.detailItem}>
                            <p>{prodact.name}</p>
                            <p>-</p>
                            <p>{prodact.qty}</p>
                          </div>
                        ))}
                        <button
                          onClick={hideDetailHandler}
                          className={styles.hideDetail}
                        >
                          <MdKeyboardDoubleArrowUp />
                          <p>приховати деталі</p>
                          <MdKeyboardDoubleArrowUp />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      )}
      <PaginationOrder />
    </div>
  );
  return (
    <>
      {render}

      <ErrModal active={modalActive} setActive={clickModalHandler} />
    </>
  );
};

export default AdminOrderList;
