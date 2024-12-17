import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home'

const Main = ({welcomeMsg}) => {
  return (
    <Routes>
        <Route path="/" element={<Home welcomeMsg={welcomeMsg}/>}/>
        <Route path="/explore" element={<></>}/>
        <Route path="/settings" element={<></>}/>
        <Route path="/history" element={<></>}/>
        <Route path="/profile" element={<></>}/>
    </Routes>
  )
}

export default Main