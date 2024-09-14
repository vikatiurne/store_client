import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from "uuid";

import { MdKeyboardDoubleArrowUp } from "react-icons/md";

import DateServices from "../../utils/DateServices";
import OrderStatusServices from "../../utils/OrderStatusServices";
import {
  fetchUserGetOne,
  hideDetail,
} from "../../pages/PersonalOffice/PersonalOfficeSlice";

import PaginationOrder from "../../components/PaginationOrder/PaginationOrder";

import styles from "../ControlPanel/ControlPanel.module.css";

const UserOrderList = () => {
  const orders = useSelector((state) => state.office.userOrders);
  const order = useSelector((state) => state.office.order);
  const isDetail = useSelector((state) => state.office.isDetail);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const clickOrderHandler = (id) => {
    dispatch(fetchUserGetOne(id));
  };

  const hideDetailHandler = () => {
    dispatch(hideDetail());
  };

  const render = (
    <div>
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
          {orders.map((item, i) => (
            <tbody key={uuidv4()}>
              <tr
                className={styles.orderList}
                onClick={() => clickOrderHandler(item.id)}
              >
                <td>{i + 1}</td>
                <td
                // onClick={() => clickOrderAdminHandler(item.id)}
                >
                  №{item.createdAt.substring(0, 10)}_{item.id}
                </td>

                {user.role !== "ADMIN" && (
                  <td
                    className={`${OrderStatusServices.getClassName(
                      item.status
                    )} ${styles.orderStatus}`}
                  >
                    <p>{OrderStatusServices.getStatusName(item.status)}</p>
                  </td>
                )}

                {user.role === "ADMIN" && (
                  <td>
                    <select
                      name="statusList"
                      className={styles.orderSelect}
                      //   onChange={(e) =>
                      //     changeStatusHandler(item.id, e.target.value)
                      //   }
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
                )}

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
                          : `Доставка за адресою ${order.address}`}{" "}
                        {DateServices.transformDate(order.readinessfor)}
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
      <PaginationOrder />
    </div>
  );
  return render;
};

export default UserOrderList;
