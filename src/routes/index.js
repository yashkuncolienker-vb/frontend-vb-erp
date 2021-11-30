import Templates from "../pages/Templates";
import NotFound from "../pages/NotFound";
import Login from "../pages/Users/Login";
import TestAuth from "../pages/TestAuth";
import Signup from "../pages/Users/Signup";
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
    path: "/users/login",
    component: Login,
    title: "Login",
  },
  {
    path: "/users/signup",
    component: Signup,
    title: "Signup",
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
