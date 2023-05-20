import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../App";

export const fetching = createAsyncThunk("/fetch", async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/vv/getfood`);
    console.log("successfully retrieved");
    return data;
  } catch (error) {
    console.log(error);
    console.log("catched thier");
  }
});
const initialState = {
  products: null,
  loading: false,
};

const fetchslice = createSlice({
  name: "datas",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetching.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetching.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetching.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default fetchslice.reducer;
