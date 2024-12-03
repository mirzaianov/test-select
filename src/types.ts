export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  job?: string;
};

export type UserList = User[];

export type meta = {
  from: number;
  to: number;
  total: number;
};
