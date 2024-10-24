import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

export const AuthRouter = Router();
const authRoutes = [
  {
    path: "/login",
    route: AuthRoutes,
  },
];
authRoutes.forEach((route) => {
  AuthRouter.use(route.path, route.route);
});
