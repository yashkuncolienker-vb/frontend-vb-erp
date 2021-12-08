import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import Login from "../pages/Users/Login";
import TestAuth from "../pages/TestAuth";
import AddUser from "../pages/Users/AddUser";
const routes = [
  {
    path: "/",
    component: Templates,
    title: "Templates",
  },
  {
    path: "/templates",
    component: Templates,
    title: "Templates",
  },
  {
    path: "/login",
    component: Login,
    title: "Login",
  },
  {
    path: "/users/adduser",
    component: AddUser,
    title: "AddUser",
  },
  {
    path: "/testAuth",
    component: TestAuth,
    title: "TestAuth",
  },
  {
    path: "*",
    component: NotFound,
    title: "Not Found",
  },
];

export default routes;
