export interface User {
  id: string;
  email: string;
  token: string;
}

export type AppGlobal = {
  user: User;
  loggedIn: boolean;
  loading: boolean;
  openDrawer: boolean;
  saveUser: (user: User) => void;
  setLoggedIn: (logged: boolean) => void;
  setLoading: (loading: boolean) => void;
  setOpenDrawer: (drawer: boolean) => void;
};

export type AppType = {
  user: User;
  loggedIn: boolean;
  loading: boolean;
  openDrawer: boolean;
};

export interface Decoded {
  id: string;
  email: string;
}

export interface Error {
  err: {
    response: {
      data: {
        message: string;
      };
    };
  };
}
