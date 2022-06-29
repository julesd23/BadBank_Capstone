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

export const UserContext = createContext()



function Spa() {

  const [balance, setBalance] = useState(0)
  const value = {balance, setBalance}

  
  return (
    <>
    <BrowserRouter>
      <div>
        <NavBar />
        <UserContext.Provider value={value} balance={balance} setBalance={setBalance}>
          <div className="container" style={{ padding: "20px" }}>
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
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <Spa />
    </Provider>
  // </React.StrictMode>
);
