import { Link } from "react-router-dom";
import { useState } from "react";

const UserLogin = () => {
    const [email,setEmail]=useState('')
    const[password,setPassword]=useState('')
const[userData,setUserData]=useState({})


const submitHandler=(e)=>{
  e.preventDefault();
  const userData={
  email:email,
  password:password
  }
      console.log(userData)
      setEmail('')
        setPassword('')
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-50 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-6xl font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-6xl '
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-6xl font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-6xl '
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 pb-4 w-full flex items-center justify-center text-6xl placeholder:text-base'
          >Login</button>

        </form>
        <p className='text-center text-4xl'>New here? <Link to='/userSignUp' className='text-blue-600 text-4xl'>Create new Account</Link></p>
      </div>
      <div>
        <Link
          to='/captainLogin'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-6xl placeholder:text-base pb-4'
        >Sign in as Captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;
 
