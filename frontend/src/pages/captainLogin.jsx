import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
         <img className='w-50 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
        <h3 className="text-7xl font-medium mb-4">What's your email</h3>
        <input
          required
          className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-7xl "
          type="email" value={password} onChange={(e)=>{setPassword(e.target.value)}}
          placeholder="email@example.com" 
        />

        <h3 className="text-7xl font-medium mb-4">Enter Password</h3>

        <input
          className="bg-[#eeeeee] mb-8 rounded-lg px-6 py-4 border w-full text-7xl"
          required
          type="password"
          placeholder="password" value={email} onChange={(e)=>{setEmail(e.target.value)}}
        />

        <button className="bg-[#111] text-white font-semibold mb-3 flex items-center justify-center rounded-lg px-4 pb-19 w-full text-7xl">
          Login
        </button>

        <p className="text-center text-4xl">
          Join a fleet?{" "}
          <Link to="/captainSignup" className="text-blue-600 text-4xl">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/userLogin"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 pb-15 w-full text-7xl"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
