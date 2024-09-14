import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllUsers } from "../Admin/AdminSlice";

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);

  const count = useSelector((state) => state.admin.users.count);
  const users = useSelector((state) => state.admin.users.rows);

  const render = (
    <section>
      
    </section>
  );

  return render;
};

export default Users;
