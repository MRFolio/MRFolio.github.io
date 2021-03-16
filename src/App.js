import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Error, Home, LocationDetails } from './views';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/location/:id" component={LocationDetails} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
