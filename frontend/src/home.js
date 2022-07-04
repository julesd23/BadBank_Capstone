import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { Card, UserContext } from './context'
import Bank from './bank.png'
import WorldClock from './components/worldClock';

function Home() {
  return (
    <div>
    <Card
      bgcolor="secondary"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<>
        <img src={Bank} className="img-fluid" />
      </>
      )}
    />
  <WorldClock></WorldClock>
    </div>
  );
}

export default Home