import { createBrowserRouter } from "react-router-dom";
import Root from "./pages/root/index.jsx";
import AllClients from "./pages/items/all-clients/index.jsx";
import NewClient from "./pages/items/new-client/index.jsx";
import ViewClient from "./pages/items/view-client/index.jsx";
import EditClient from "./pages/items/edit-client/index.jsx";
import LoginScreen from "./pages/login/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
    index: true,
  },
  {
    path: "/registry",
    element: <Root />,
    children: [
      {
        index: true,
        element: <AllClients />,
      },
      {
        path: ":id",
        element: <ViewClient />,
      },
      {
        path: "edit/:id",
        element: <EditClient />,
      },
      {
        path: "new",
        element: <NewClient />,
      },
    ],
  },
]);

export default router;
