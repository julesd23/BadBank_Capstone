import './styles.css'
import { React, useState, createContext } from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './navbar'
// import { UserContext } from './context';
import Home from './home'
import Register from './Register';
import Login from './login'
import Deposit from './deposit';
import Withdraw from './withdraw';
import Balance from './balance'
import AllData from './alldata';
import { ReactDOM } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux'
import WorldClock from './components/worldClock';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const UserContext = createContext()



function App() {

  const [balance, setBalance] = useState(0)
  const value = {balance, setBalance}

  
  return (
    <div>
    <GoogleOAuthProvider clientId="810852788214-a5mjmk908heu421jco4us44f3g90vllv.apps.googleusercontent.com">
    <BrowserRouter>
      <div>
        <NavBar />
        <UserContext.Provider value={value} balance={balance} setBalance={setBalance}>
          <div className="home">
            <Routes>
              <Route path="/" exact element={<Home/>} />
              <Route path="/CreateAccount/" element={<Register/>} />
              <Route path="/login/" element={<Login/>} />
              <Route path="/deposit/" element={<Deposit/>} />
              <Route path="/withdraw/" element={<Withdraw/>} />
              {/* <Route path="/transactions/" element={Transactions} /> */}
              <Route path="/balance/" element={<Balance/>} />
              <Route path="/alldata/" element={<AllData/>} />
            </Routes>
          </div>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
    <ToastContainer />
    <WorldClock></WorldClock>
    </GoogleOAuthProvider>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  // </React.StrictMode>
);

module.exports = App;