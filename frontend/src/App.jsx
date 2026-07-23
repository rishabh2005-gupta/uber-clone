import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserLogin from "./pages/userLogin";
import UserSignUp from "./pages/userSignUp";
import CaptainLogin from "./pages/captainLogin";
import CaptainSignUp from "./pages/captainSignUp";
import { useContext
 } from "react";
import userDataContext from './context/userContext'

const App = () => {
  const ans=useContext(userDataContext)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/userSignUp" element={<UserSignUp />} />
      <Route path="/captainLogin" element={<CaptainLogin />} />
      <Route path="/captainSignUp" element={<CaptainSignUp />} />
    </Routes>
  );
};

export default App;
