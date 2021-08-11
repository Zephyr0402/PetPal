import {BrowserRouter,Redirect,Route, Switch, HashRouter} from 'react-router-dom'
import './App.css';
import Main from './Layout/Main'
import LoginForm from './User/LoginForm'
import PostAnimalForm from './User/PostAnimalForm'
import SignUpForm from './User/SignUpForm'
import UserInfoPage from './User/UserInfoPage'
import "antd/dist/antd.css";
import ResetPwdForm from './User/ResetPwdForm'
import { WhisperPanel } from './Chat/WhisperPanel';
import Chat from './Chat/Chat';

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
        <Route path = "/register">
          <SignUpForm/>
        </Route>
        <Route path = "/user/:uuid">
          <UserInfoPage/>
        </Route>
        <Route path = "/reset_pwd/:token" component = {ResetPwdForm}/>
        {/* <Route path = "/chat/*" component = {Chat}/> */}
        <HashRouter
          basename= '/chat'
        >
          <Route path = '/:cid?' component = {Chat}>
          </Route>
        </HashRouter>
        
        <Route path = "/whisperpanel">
          <WhisperPanel name = "example" avatar = "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></WhisperPanel>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
