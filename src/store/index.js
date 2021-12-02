import { configureStore } from "@reduxjs/toolkit";

import contentsSlice from "./contents-slice";
import uiSlice from "./ui-slice";
import userSlice from "./user-slice";

export default configureStore({
  reducer: {
    contents: contentsSlice.reducer,
    ui: uiSlice.reducer,
    user: userSlice.reducer,
  },
});
