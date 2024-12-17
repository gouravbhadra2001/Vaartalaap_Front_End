import { NavLink } from 'react-router-dom';
import './App.css';
import Main from './Routes/Main';
import { useEffect, useState } from 'react';

function App() {

  //const [welcomeMsg, setWelcomeMsg] = useState('')

  const welcomeMsg = "Hi User, Welcome to Vartalaap.."

  /*
  useEffect(()=>{
    setWelcomeMsg(welcome)
  })*/

  return (

    <div className="App">
      <header className="App-header">
        <span className="App-logo">
          Vartalaap (©gouRAV_bhaDRA)
        </span>

        {/*<span className="App-nav-btn">
          <img height={24} width={24} src="https://img.icons8.com/ios-filled/50/menu--v6.png" alt="" />
        </span>*/}

        <span style={{cursor:'pointer'}}>
        <img width="40" height="40" src="https://img.icons8.com/bubbles/50/user.png" className='header-profile-img' alt="user"/>
        </span>
      </header>

<Main welcomeMsg={welcomeMsg}/>
      <footer className='App-footer App-dock'>
          <NavLink className='menu-link' to="/"><img height={50} width={50} src="https://img.icons8.com/fluency-systems-filled/48/home.png" alt="" className="menu home-menu" /></NavLink>
          <NavLink className='menu-link'><img height={50} width={50} src="https://img.icons8.com/fluency-systems-filled/48/adventures.png" alt="" className="menu explore-more-menu" /></NavLink>
          <NavLink className='menu-link settings-link'><img height={50} width={50} src="https://img.icons8.com/material-rounded/48/gear.png" alt="" className="menu settings-menu" /></NavLink>
          <NavLink className='menu-link'><img height={50} width={50} src="https://img.icons8.com/sf-regular-filled/48/cloud-database.png" alt="" className="menu history-menu" /></NavLink>
          <NavLink className='menu-link'><img height={50} width={50} src="https://img.icons8.com/sf-regular-filled/48/gender-neutral-user.png" alt="gender-neutral-user" className="menu profile-menu" /></NavLink>
      </footer>


    </div>
  );
}

export default App;
