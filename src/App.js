import { Route, Switch } from "react-router-dom";

import routes from "./routes/index";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact
            render={(props) => <route.component {...props} />}
          ></Route>
        ))}
      </Switch>
    </Layout>
  );
}

export default App;
