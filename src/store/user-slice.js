import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  //   openTasks: false,
  //   openPMO: false,
  //   openCMS: false,
  //   openRR: false,
  //   openHamburger: false,
  //   bool: false,
  loginBool: Boolean(Cookies.get("Token")),

  //   selectedIndex: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // handleHamburger(state, action) {
    //   state.openHamburger = !state.openHamburger;
    // },
    // handleListItemClick(state, action) {
    //   state.selectedIndex = action.payload;
    // },
    // handleClickTasks(state, action) {
    //   state.openTasks = !state.openTasks;
    // },
    // handleClickPMO(state, action) {
    //   state.openPMO = !state.openPMO;
    // },
    // handleClickCMS(state, action) {
    //   state.openCMS = !state.openCMS;
    // },
    // handleClickRR(state, action) {
    //   state.openRR = !state.openRR;
    // },
    // handleBool(state, action) {
    //   state.bool = action.payload.bool;
    // },
    handleLoginBool(state, action) {
      state.loginBool = action.payload.loginBool;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
