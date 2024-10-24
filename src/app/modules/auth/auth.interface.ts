export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
