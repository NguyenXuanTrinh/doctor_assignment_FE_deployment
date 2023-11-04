import { PATH } from "./paths";
import RequireAuth from "./RequireAuth";

import {
  Dashboard,
  Tab1,
  Tab2,
  Tab3,
  Unauthorized,
  Forbidden,
  NotFound,
} from "../pages/pages";

export const routes = [
  {
    element: <Dashboard />,
    path: "/",
  },
  {
    element: <Dashboard />,
    path: PATH.DASHBOARD,
    children: [
      {
        path: PATH.TAB1,
        element: <Tab1 />,
      },
      {
        path: PATH.TAB2,
        element: <Tab2 />,
      },
      {
        path: PATH.TAB3,
        element: <Tab3 />,
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
