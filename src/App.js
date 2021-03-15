import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Error, Home, SingleCity } from './views';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/city/:id" component={SingleCity} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};

export default App;
