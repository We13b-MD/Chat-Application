import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./Components/PrivateRoute";
import Room from "./Pages/Room";
import LoginPage from "./Pages/LoginPage";
import { AuthProvider } from "./Utils/AuthContext";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    
    <Router>
      <AuthProvider>
    <Routes>
    <Route path = '/login' element = {<LoginPage/>}/>
    <Route path = '/register' element = {<RegisterPage/>}/>
    <Route element = {<PrivateRoutes/>}>
    <Route path = '/' element = {<Room/>}/>
    
    </Route>
    
    </Routes>
    </AuthProvider>
    </Router>
    
    
  );
}

export default App;
