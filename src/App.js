import { Route, Switch, Redirect } from 'react-router-dom';

import AllTemplates from './pages/AllTemplates';

import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/quotes' />
        </Route>
        <Route path='/quotes' exact>
          <AllTemplates />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
