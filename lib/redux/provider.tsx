"use client";

import React from "react";
import { Provider } from "react-redux";
import store from "./store";

type PropsTypes = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<PropsTypes> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
