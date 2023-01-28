import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
  
function App() {
    
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
      </BrowserRouter>
      </>
  );
}
  
export default App;