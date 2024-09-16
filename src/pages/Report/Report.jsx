import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { ImPrinter } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";

import { fetchGetAdminGetAll } from "../PersonalOffice/PersonalOfficeSlice";

import styles from "./Report.module.css";
import DateServices from "../../utils/DateServices";

const Report = () => {
  const orders = useSelector((state) => state.office.userOrders);
  const count = useSelector((state) => state.office.count);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAdminGetAll({ page: 1, limit: count, status: 0 }));
  }, [dispatch, count]);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Звіт за новими замовленнями",
  });

  return !!orders.length ? (
    <div className={styles.reportWrapper}>
      <button onClick={handlePrint} className={styles.printBtn}>
        <p>Друкувати</p>
        <ImPrinter />
      </button>

      <div ref={printRef}>
        <table className={styles.table}>
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>No.</th>
              <th>Замовник</th>
              <th>Готовність</th>
              <th>Замовлення</th>
              <th>Примітка</th>
            </tr>
          </thead>
          {orders.map((item) => (
            <tbody key={uuidv4()}>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{DateServices.transformDate(item.readinessfor)}</td>
                <td>
                  {item.items.map((order) => (
                    <div key={uuidv4()} className={styles.items}>
                      <p>
                        {order.name}: {order.qty}
                      </p>
                    </div>
                  ))}
                </td>
                <td>{item.comment}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  ) : (
    <p className={styles.emptyNewOrders}>Нових замовлень немає</p>
  );
};

export default Report;
