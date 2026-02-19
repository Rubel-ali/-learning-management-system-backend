import express from "express";
import { userRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { NotificationRoutes } from "../modules/Notification/Notification.routes";
import passportRoutes from "../modules/Auth/passport.routes";
import { staffRoutes } from "../modules/Staff/Staff.route";
import { servicefRoutes } from "../modules/Services/Service.route";
import { AppointmentRoutes } from "../modules/Appointment/Appointment.route";
import { QueueRoutes } from "../modules/queue/Queue.routes";
import { DashboardRoutes } from "../modules/Dashboard/Dashboard.route";
import { ActivityRoutes } from "../modules/ActivityLog/Activity.route";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
		path: "/auth",
		route: passportRoutes,
	},
  {
		path: "/staff",
		route: staffRoutes,
	},
  {
		path: "/services",
		route: servicefRoutes,
	},
  {
		path: "/appointments",
		route: AppointmentRoutes,
	},
  {
		path: "/queue",
		route: QueueRoutes,
	},
  {
		path: "/dashboard",
		route: DashboardRoutes,
	},
  {
		path: "/activity-logs",
		route: ActivityRoutes,
	},
  {
    path: "/notifications",
    route: NotificationRoutes,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;