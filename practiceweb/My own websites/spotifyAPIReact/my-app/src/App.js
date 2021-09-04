import { NavLink, Switch, Route} from 'react-router-dom';
// pages
import Login from './pages/login.js';
import Profile from './pages/profile';
import Dashboard from './pages/dashboard.js';

const code = new URLSearchParams(window.location.search).get('code');
console.log(`this is the code ${code}`);
function App() {
  return code ? <Dashboard code={code}/> : <Login />
  
}

export default App;
