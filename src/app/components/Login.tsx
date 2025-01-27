"use client"
import React, { useState } from 'react'
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {

  const [show, setShow] = useState(false)
  const [email, setEmail] = useState <string | boolean>(false)
  const [password, setPassword] = useState<string |boolean>(false)
  const [emailError, setEmailError] = useState <boolean>(false)
  const [passwordError, setPasswordError] = useState <boolean>(false)
  const [err, setErr] = useState<string | null>(null);
  const  [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();

  const submitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    if (!email) {
      setEmailError(true)
    }

    else{
      setEmailError(false)
    }

    if (!password) {
      setPasswordError(true)
    }

    else {
      setPasswordError(false)
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect:false
      });

      if(res?.error){
        setErr("Invalid credentials");
        return
      }

      router.replace('/dashboard')
    } catch (error) {
      setErr("Something went wrong");
      console.error("An issue occured",error);
      
    }finally{
      setLoading(false);
    }
  }


  const toggle = () => {
    setShow(!show)
  }

  return (
    <div className='fixed lg:w-full w-screen lg:h-[100vh] h-screen flex flex-col justify-center items-center bg'>
        <div className='w-[22rem] flex flex-col fixed justify-center items-left bg-white py-8 px-8  rounded-md md:shadow-md lg:border-blue-300 md:border-blue-300 lg:border-t-2 md:border-t-2 lg:py-11'>
        
          <h1 className='ml-3 text-3xl font-bold bg-gradient-to-r from-blue-400 to bg-indigo-900 bg-clip-text  text-transparent'>Login</h1>

            <form onSubmit={submitHandler} className='flex flex-col gap-5 pt-6 pb-3'>
                <div className='w-full relative'>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} className= {`${emailError && 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-red-50 text-base lg:text-sm outline-none  text-red-600 text-opacity-90 placeholder-opacity-70 placeholder-red-600' || 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-slate-50 text-base lg:text-sm  outline-none placeholder-blue-400 text-blue-900 text-opacity-90 placeholder-opacity-70'}`} type='email' placeholder={`${emailError && 'please enter email' || 'Email'}`} /> <div className={( emailError ? 'absolute top-2 right-4 text-sm text-red-600 opacity-50 z-10' :  'absolute top-2 right-4 text-sm text-blue-400 opacity-50 z-10')}><IoMdMail/></div>
                </div>

                <div className='w-full relative'>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} className= {`${passwordError && 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-red-50 text-base lg:text-sm outline-none  text-red-600 text-opacity-90 placeholder-opacity-70 placeholder-red-600' || 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-slate-50 text-base lg:text-sm  outline-none placeholder-blue-400 text-blue-900 text-opacity-90 placeholder-opacity-70'}`}
                 type={( show === true ? 'password' : 'text')} placeholder={`${passwordError && 'please enter password' || 'Password'}`} /> <div className={( passwordError ? 'absolute top-2 right-4 text-sm text-red-600 opacity-50 z-10' :  'absolute top-2 right-4 text-sm text-blue-400 opacity-50 z-10')}><FaLock/></div>
                </div>
                  
                <div className='w-full relative text-xs text-center align-middle flex items-center'>
                  {( show === true ?
                 <p onClick={toggle}  className='text-blue-400 ml-auto flex items-center text-center mr-2  cursor-pointer text-xs'><FaRegSquare /></p>
                    :
                 <p onClick={toggle}  className='text-blue-400 ml-auto flex items-center text-center mr-2  cursor-pointer text-xs'><FaCheckSquare/></p>
                  )}
                 <p className='text-xs text-blue-400 mr-3'>Show password</p>
                </div>

                <button className='group flex place-items-center justify-between w-full px-4 py-2 relative bg-blue-600  text-white font-semibold rounded-md hover:bg-blue-700 hover:translate-y-px duration-300 glass ' type='submit' disabled={loading}>
                  {loading? (<span className='flex items-center justify-center'>
                    <span className='button-loader py-1 ml-28'>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </span>):(<>
                  
                 <span className='absolute left-1/2 -translate-x-1/2 transition'>Login</span> 
                 <span className='ml-auto opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition'><MdOutlineKeyboardArrowRight/></span>
                  </>)}
                </button>
                  <Link href={"/forgotpassword"} className='text-xs mt-1 text-blue-400'>Forgot Password?</Link>
              

                {err && <div className='text-red-600 text-xs'>{err}</div> }
                
            </form>        

            <div className=''>
              <span className="text-sm flex gap-2 whitespace-nowrap items-center">Don&apos;t have an account? <Link href={"/register"} className='text-sm bg-gradient-to-r from-sky-600  to-cyan-900 text-transparent bg-clip-text cursor-pointer'>Create account</Link></span>
            </div>
        </div>
      </div>
  )
}

export default Login


