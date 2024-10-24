import { Router } from "express";
import { locationRoute } from "../modules/location/location.route";
import { userRouter } from "../modules/user/user.route";
export const router = Router();

const moduleRoutes = [
  {
    path: "/location",
    route: locationRoute,
  },
  {
    path: "/user",
    route: userRouter,
  },
];

moduleRoutes?.forEach((route) => {
  router.use(route.path, route.route);
});
