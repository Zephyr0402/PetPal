import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import PostAnimalForm from "./components/PostAnimalForm";

function App() {


  const postAnimal = (newAnimal) => {
    //TODO: replace with post animal functionality
    console.log("postAnimal");
  };

  return (
   <PostAnimalForm newAnimal={postAnimal} />
  );
}

export default App;
