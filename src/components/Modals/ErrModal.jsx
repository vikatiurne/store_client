import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import styles from "./Modals.module.css";
import { fetchGetAdminGetAll, getOrderStatus, search } from "../../pages/PersonalOffice/PersonalOfficeSlice";
import { showOrders, showReport } from "../../pages/Admin/AdminSlice";

const ErrModal = ({ active, setActive }) => {
    const err = useSelector((state) => state.office.error);
    const limit = useSelector((state) => state.office.limit);
    const page = useSelector((state) => state.office.page);
    const orderStatus = useSelector((state) => state.office.orderStatus);
  
    const dispatch = useDispatch();
    
    const getAllOrdersHandler = () => {
      setActive()
    dispatch(showOrders(true));
    dispatch(showReport(false));
    dispatch(fetchGetAdminGetAll({ page, limit, status: orderStatus }))
    dispatch(search(false));
    dispatch(getOrderStatus(""));
  };

  const render = (
    <Modal active={active} setActive={setActive}>
      {!!err && (
        <div className={styles.authModal}>
          {!!err ? <p>{err}</p> : <p>msg</p>}
          <Button onclick={getAllOrdersHandler}>Зрозуміло</Button>
        </div>
      )}
    </Modal>
  );

  return render;
};

export default ErrModal;
