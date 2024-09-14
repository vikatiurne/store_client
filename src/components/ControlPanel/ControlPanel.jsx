import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CiSearch } from "react-icons/ci";

import {
  fetchAdminGetOne,
  getOrderStatus,
  hideDetail,
  search,
} from "../../pages/PersonalOffice/PersonalOfficeSlice";

import styles from "./ControlPanel.module.css";

const ControlPanel = () => {
  const sortName = useSelector((state) => state.office.sortName);
  const isSearch = useSelector((state) => state.office.isSearch);

  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const searchHandler = () => {
    const id = searchRef.current.value;
    if (!!id) {
      dispatch(fetchAdminGetOne(id));
      dispatch(search(true));
      searchRef.current.value = "";
    }
  };

  const selectHandler = (e) => {
    dispatch(getOrderStatus(e.target.value));
  };

  const showAllHandler = () => {
    dispatch(search(false));
    dispatch(hideDetail());
    dispatch(getOrderStatus(""));
  };

  const renderOrders = (
    <div className={styles.controlPanel}>
      <div className={styles.search}>
        <CiSearch className={styles.iconSearch} />
        <input
          type="search"
          name="search"
          placeholder="№ замовлення"
          className={styles.inputSearch}
          ref={searchRef}
        />
        <button onClick={searchHandler} className={styles.searchBtn}>
          пошук
        </button>
      </div>
      {!isSearch ? (
        <div className={styles.sortOrders}>
          <p>показати:</p>
          <select
            name="showList"
            defaultValue={sortName}
            onChange={selectHandler}
          >
            <option disabled>{sortName}</option>
            <option value="">всі</option>
            <option value="0">нові</option>
            <option value="1">в роботі</option>
            <option value="2">готові</option>
            <option value="3">виконані</option>
          </select>
        </div>
      ) : (
        <button onClick={showAllHandler} className={styles.sortOrders}>
          показати всі
        </button>
      )}
    </div>
  );

  return renderOrders;
};

export default ControlPanel;
