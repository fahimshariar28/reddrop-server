import { Router } from "express";
import { locationRoute } from "../modules/location/location.route";
export const router = Router();

const moduleRoutes = [
  {
    path: "/location",
    route: locationRoute,
  },
];

moduleRoutes?.forEach((route) => {
  router.use(route.path, route.route);
});
