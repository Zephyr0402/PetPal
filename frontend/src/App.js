import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import PostAnimalForm from "./components/PostAnimalForm";
import LoginForm from "./components/LoginForm";

function App() {


  const postAnimal = (newAnimal) => {
    //TODO: replace with post animal functionality
    console.log("postAnimal");
  };

  return (
      <main>
        <PostAnimalForm />
        <LoginForm />
      </main>
  )
}

export default App;
