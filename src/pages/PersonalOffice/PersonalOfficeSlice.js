import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import OrderService from "../../services/OrderService";
import GetServices from "../../services/GetServices";

const initialState = {
  status: "idle",
  userOrders: [],
  userData: {},
  order: {},
  // order: [],
  count: null,
  limit: 8,
  page: 1,
  isDetail: false,
  isSearch: false,
  orderStatus: "",
  sortName: "всі",
  error: "",
};

export const fetchUserGetAll = createAsyncThunk(
  "order/fetchUserGetAll",
  async ({ id, page, limit }, { rejectWithValue }) => {
    try {
      const response = await OrderService.userGetAll(id, page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserGetOne = createAsyncThunk(
  "order/fetchUserGetOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await OrderService.userGetOne(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAdminGetOne = createAsyncThunk(
  "order/fetchAdminGetOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await OrderService.adminGetOne(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetAdminGetAll = createAsyncThunk(
  "order/fetchGetAdminGetAll",
  async ({ limit, page, status }, { rejectWithValue }) => {
    try {
      return await GetServices.getAllOrders(limit, page, status);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUpdateStatus = createAsyncThunk(
  "order/fetchUpdateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await OrderService.adminUpdate(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const PersonalOfficeSlice = createSlice({
  name: "userOffice",
  initialState,
  reducers: {
    selectedLimit: {
      reducer(state, { payload }) {
        state.limit = payload;
      },
    },
    selectedPage: {
      reducer(state, { payload }) {
        state.page = payload;
      },
    },
    hideDetail: {
      reducer(state) {
        state.isDetail = false;
      },
    },
    search: {
      reducer(state, { payload }) {
        state.isSearch = payload;
      },
    },
    getOrderStatus: {
      reducer(state, { payload }) {
        state.orderStatus = payload;
        const sortSelect = {
          "": "всі",
          0: "нові",
          1: "в роботі",
          2: "готові",
          3: "виконане",
        };
        state.sortName = sortSelect[payload];
      },
    },
  },
  extraReducers(builder) {
    builder

      .addCase(fetchUserGetAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserGetAll.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.userOrders = payload.rows;
        state.count = payload.count;
      })
      .addCase(fetchUserGetAll.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload.message;
      })
      .addCase(fetchUserGetOne.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserGetOne.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.isDetail = true;
        state.order = payload;
      })
      .addCase(fetchUserGetOne.rejected, (state, { payload }) => {
        state.status = "error";
      })
      .addCase(fetchGetAdminGetAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetAdminGetAll.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.userOrders = payload.data.rows;
        state.count = payload.data.count;
      })
      .addCase(fetchGetAdminGetAll.rejected, (state, { payload }) => {
        state.status = "error";
        console.log(payload);
      })
      .addCase(fetchAdminGetOne.pending, (state) => {
        state.status = "loading";
        state.error = ''
      })
      .addCase(fetchAdminGetOne.fulfilled, (state, {payload}) => {
        state.status = "success";
        state.isDetail = true;
        state.order = payload;
        console.log(payload);
      })
      .addCase(fetchAdminGetOne.rejected, (state, { payload }) => {
        state.status = "error";
        state.error = payload.message;
      })
      .addCase(fetchUpdateStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateStatus.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.userOrders = payload;
      })
      .addCase(fetchUpdateStatus.rejected, (state, { payload }) => {
        state.status = "error";
      });
  },
});

export const {
  selectedLimit,
  selectedPage,
  hideDetail,
  search,
  getOrderStatus,
} = PersonalOfficeSlice.actions;
export default PersonalOfficeSlice.reducer;
