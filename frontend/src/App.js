import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import PostAnimalForm from "./components/PostAnimalForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {


  return (
      <main>
        <PostAnimalForm />
        <LoginForm />
        <RegisterForm/>
      </main>
  )
}

export default App;
