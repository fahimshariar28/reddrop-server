import { Router } from "express";
import { locationRoute } from "../modules/location/location.route";
import { userRoute } from "../modules/user/user.route";
import { requestRoute } from "../modules/request/request.route";
import { donationRoute } from "../modules/donation/donation.router";
import { feedbackRoute } from "../modules/feedback/feedback.route";
export const router = Router();

const moduleRoutes = [
  {
    path: "/location",
    route: locationRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/request",
    route: requestRoute,
  },
  {
    path: "/donation",
    route: donationRoute,
  },
  {
    path: "/feedback",
    route: feedbackRoute,
  },
];

moduleRoutes?.forEach((route) => {
  router.use(route.path, route.route);
});
