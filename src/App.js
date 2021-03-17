import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Error, Home, LocationWeather } from './views';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/location/:coordinates"
          component={LocationWeather}
          // render={(props) => <Weather {...props} />}
        />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
