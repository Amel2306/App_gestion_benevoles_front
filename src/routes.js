import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import HomePage from './Components/HomePage/HomePage';

const Routess = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginSignup/>} />
                <Route path="/home" element={<HomePage/>} />
            </Routes>
        </Router>
    );
};
export default Routess;
