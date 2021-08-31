import { NavLink, Switch, Route} from 'react-router-dom';
// pages
import Homepage from './pages/homepage.js';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage}></Route>
    </Switch>
  );
}

export default App;
