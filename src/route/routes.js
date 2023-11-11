import { PATH } from "../pages/paths";
import RequireAuth from "./RequireAuth";

import {
  LoginPage,
  Dashboard,
  MedicalFinder,
  Profile,
  Unauthorized,
  Forbidden,
  NotFound,
  Appointment,
} from "../pages/pages";

export const routes = [
  {
    element: <LoginPage />,
    path: "/",
  },
  {
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
    path: PATH.DASHBOARD,
    children: [
      {
        path: PATH.MEDICAL_CENTER_FINDER,
        element: <MedicalFinder />,
      },
      {
        path: PATH.PROFILE,
        element: <Profile />,
      },
      {
        path: PATH.APPOINTMENT,
        element: <Appointment />,
      },
    ],
  },
  {
    path: PATH.UNAUTHORIZED,
    element: <Unauthorized />,
  },
  {
    path: PATH.FORBIDDEN,
    element: <Forbidden />,
  },
  {
    path: PATH.NOT_FOUND,
    element: <NotFound />,
  },
];
