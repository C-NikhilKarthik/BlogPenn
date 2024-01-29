import React, { createContext, useContext, useState } from "react";
import { AppGlobal, AppType, User } from "@/@types/global";

export const appContext = createContext<AppGlobal | null>(null);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppType>({
    user: {
      id: "",
      email: "",
      token: "",
    },
    openDrawer: true,
    loggedIn: false,
    loading: true,
  });

  const saveUser = (user: User) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        id: user.id,
        email: user.email,
        token: user.token,
      },
    }));
  };

  const setLoggedIn = (loggedIn: boolean) => {
    setState((prevState) => ({
      ...prevState,
      loggedIn: loggedIn,
    }));
  };

  const setLoading = (loading: boolean) => {
    setState((prevState) => ({
      ...prevState,
      loading: loading,
    }));
  };

  const setOpenDrawer = (drawer: boolean) => {
    setState((prevState) => ({
      ...prevState,
      openDrawer: drawer,
    }));
  };

  const appGlobalValue: AppGlobal = {
    user: state.user,
    loggedIn: state.loggedIn,
    loading: state.loading,
    openDrawer: state.openDrawer,
    saveUser,
    setLoggedIn,
    setLoading,
    setOpenDrawer,
  };

  return (
    <appContext.Provider value={appGlobalValue}>{children}</appContext.Provider>
  );
};

export const AppStates = () => {
  const {
    user,
    loggedIn,
    loading,
    openDrawer,
    saveUser,
    setLoggedIn,
    setLoading,
    setOpenDrawer,
  } = useContext(appContext) as AppGlobal;

  return {
    user,
    loggedIn,
    loading,
    openDrawer,
    saveUser,
    setLoggedIn,
    setLoading,
    setOpenDrawer,
  };
};

export default AppContextProvider;
