import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LocationWeather } from './components';
import { Error, Home } from './views';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/location/:coordinates"
          // component={LocationDetails}
          render={(props) => <LocationWeather {...props} />}
        />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
