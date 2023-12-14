import React from 'react';
import { Routes,Route } from 'react-router-dom';
import TwitterSignIn from '../components/TwitterSignIn';
import HomePage from '../components/HomePage';

function Router() {
  return (
    <Routes>
        <Route path='/login' element={<TwitterSignIn/>}></Route>
        <Route path='/' element={<HomePage/>}></Route>
    </Routes>
  )
}

export default Router