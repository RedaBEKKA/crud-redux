import React from 'react';
import {Routes,Route} from "react-router-dom"
import './App.css';
import { AddUser } from './pages/AddUser';
import { EditUser } from './pages/EditUser';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addUser" element={<AddUser/>} />
          <Route path='/editUser/:id' element={<EditUser/>} />
        </Routes>
    </div>
  );
}

export default App;
