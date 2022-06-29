import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Card, UserContext} from './context'
import Bank from './bank.png'

function Home(){
  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src={Bank} className="img-fluid" alt="Responsive image"/>)}
    />
  );  
}

export default Home