export enum TRegisterUserRole {
  'buyer',
  'seller',
}

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: TRegisterUserRole;
};
