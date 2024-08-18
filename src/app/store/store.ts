import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../Features/theme/themeSlice";
import dataReducer from "../Features/dataManagement/dataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
