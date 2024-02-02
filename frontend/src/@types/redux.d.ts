export interface User {
  id: string;
  email: string;
  userName: string;
  token: string;
}

export type AppGlobal = {
  user: User;
  loggedIn: boolean;
  loading: boolean;
  draftDrawer: boolean;
};
