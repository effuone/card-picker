type RegistrationData = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type UserData = {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  token: string;
};

export type { RegistrationData, LoginData, UserData };
