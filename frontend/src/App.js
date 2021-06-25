import {BrowserRouter,Redirect,Route, Switch} from 'react-router-dom'
import './App.css';
import Main from './Layout/Main'
import LoginForm from './User/LoginForm'
import PostAnimalForm from './User/PostAnimalForm'
import SignUpForm from './User/SignUpForm'
import UserInfoPage from './User/UserInfoPage'
import Test from './Test'
import "antd/dist/antd.css";
import {LogContext} from './Layout/HeaderContext';
import { useState } from 'react';


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
        <Route path = "/user">
          <UserInfoPage/>
        </Route>
        <Route path = "/test">
          <Test/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
