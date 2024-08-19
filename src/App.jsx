import { useMemo, useState } from 'react'
import styled from "styled-components";
import './App.css'
import Dashboard from './component/Dashboard/Dashboard'
import Income from './component/Income/Income'
import Expenses from './component/Expenses/Expenses'
import Orb from './component/Orb/Orb'
import Navigation from './component/Navigation/Navigation';
import { MainLayout } from './styles/Layouts';
import bg from "./img/bg.png"
import Chart from './component/Chart/Chart';
import { hamburger } from './utils/Icons';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './authentication/Login';
import Register from './authentication/Register';
function App() {

  const [active, setActive] = useState(1)
  const [navVisible, setNavVisible] = useState(true);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Chart />
      case 3: 
        return <Income />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(()=> {
    return <Orb />
  },[])

  return (
    <>
    <AppStyled bg={bg} className='App'>
      {orbMemo}
      <MainLayout>
      {navVisible ? (
          <Navigation active={active} setActive={setActive} />
        ) : (
          <div className="nav-toggle" onClick={() => setNavVisible(true)}>
            {hamburger} 
          </div>
        )}      
      <main>
        {displayData()}
      </main>
      </MainLayout>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
      </BrowserRouter>
    </AppStyled>
    </>
  )
}

const AppStyled = styled.div`
  height: 100vh;
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(2.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`; 

export default App
