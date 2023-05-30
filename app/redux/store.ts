"use client";

import { configureStore } from "@reduxjs/toolkit";
import Txt2imgSlice from "./Features/Txt2imgState/Txt2imgSlice";
import Img2imgSlice from "./Features/Img2imgState/Img2imgSlice";

export const store = configureStore({
  reducer: {
    txt2img: Txt2imgSlice,
    img2img: Img2imgSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
