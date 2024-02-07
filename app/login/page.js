'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
    // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

    useEffect(() => {
    if(sessionStatus === 'authenticated'){
        router.replace('/dashboard')
    }
},[sessionStatus, router])

const isValidEmail = email => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(email)
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    if (!isValidEmail(email)) return setError('Email is invalid');
    
    if (!password || password.length < 8) return setError('Password is invalid');

      const res = await signIn('credentials',{
        redirect:false,
        email,
        password
      })

      if(res?.error){
        setError('Invalid email or password')
        if(res?.url) router.replace('/dashboard');
      } else {
                  setError('')
      }
  }
  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>
  }
    return (  
      sessionStatus !== "authenticated"  &&    (
        <div className="flex min-h-screen flex-col items-center p-24 justify-between">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='email'
            className="form-control w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="email"
            required
          />
          <input
            type="password"
            name='password'
            className="form-control w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="password"
            required
          />
          <button 
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
          >
            Sign In
          </button>
          <p className="text-red-600 text-[16px] mb-4">{ error && error}</p>
          </form>
          <button
            className='w-full bg-black text-white py-2 rounded hover:bg-gray-800'
            type='button'
            onClick={() => signIn('github')}>
            Sign in with Github
          </button>
              <div className="text-center text-gray-500 mt-4">- OR -</div>
              <Link
                  className="block text-center text-blue-500 hover:underline mt-2"
                  href='/register'>
              Not registered yet
              </Link>
      </div>
    </div>)
    )
}