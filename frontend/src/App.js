import {BrowserRouter,Redirect,Route, Switch} from 'react-router-dom'
import './App.css';
import Main from './main'
import LoginForm from './components/LoginForm'
import PostAnimalForm from './components/PostAnimalForm'
import SignUpForm from './components/SignUpForm'
import "antd/dist/antd.css";
import UtilityView from './components/UtilityView';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = "/">
          <Redirect to = "/map"/>
        </Route>
        <Route path = "/map">
          <Main/>
        </Route>
        <Route path = "/login">
          <LoginForm/>
        </Route>
        <Route path = "/post">
          <PostAnimalForm/>
        </Route>
        <Route path = "/join">
          <SignUpForm/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
