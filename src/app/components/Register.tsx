"use client"
import React, { useState } from 'react'
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import Link from 'next/link';
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { validatePhoneNumber, PhoneValidationResponse} from '@/utils/phoneValidator';
import axios from 'axios';
import { useRouter } from 'next/navigation';



const Register = () => {

  const [show, setShow] = useState <boolean>(false)
  const [email, setEmail] = useState <string | boolean>(false)
  const [password, setPassword] = useState<string |boolean>(false)
  const [username,setUsername] = useState <string | boolean>(false)

  const [phone, setPhone] = useState<string | undefined >('')
  const [country, setCountry] = useState<string>('')
  const [phoneError, setPhoneError] = useState<boolean>(false)
  const [err, setErr] = useState<string | null | boolean>(null);
  const [validationResult, setValidationResult] = useState<PhoneValidationResponse | null >(null);  // imported from utils phone validate
  const [emailError, setEmailError] = useState <boolean>(false)
  const [passwordError, setPasswordError] = useState <boolean>(false)
  const [usernameError,setUsernameError] = useState <boolean>(false)
  const [loading, setLoading] = useState <boolean>(false)

  const router = useRouter();


  const handleCountryChange = (newCountry:string | undefined) => {
    setCountry(newCountry || "US")
    return;
  } //function for country initials

  const handleValidate = async () => {
    setErr(null)
    setValidationResult(null)

    if (!phone || !country){
      setErr('Please enter phone number');
      return;

    }
// Error if phone is not valid
    const result = await validatePhoneNumber(phone, country);
    if (result){
      setValidationResult(result);
    }
    if (result &&!result.valid){
      setErr('Please enter a valid phone number')
    } else{
      setErr("")
    }
   

    // if(!validationResult?.valid){
    //   setErr('Please enter a valid phone number');
    // } else{
    //   setErr("")
    // }
    // return;
  };

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

    if (!username){
        setUsernameError(true)
    }

    else {
        setUsernameError(false)
    }


    if (!phone) {
      setPhoneError(true)
    }

    else{
      setPhoneError(false)
    }

    await handleValidate();

    if (err || !validationResult?.valid) {
      setLoading(false);
      return; // Stop form submission if there's an error
    }


   try {

    const resUserExists = await fetch("http://localhost:3000/api/user", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
  });

  const {existingUser} = await resUserExists.json();


  if(existingUser) {
   setErr('User already exists.');
   setLoading(false);
    return;
   } 
   else {
     setErr(false);
   }


    // performing a fetch call to the register api route
    const res = await axios.post('http://localhost:3000/api/register', {username,email,password,phone})
    if (res.status === 200){
      console.log('User registered successfully')

      router.replace(`/otpverify?email=${email}`)

    } else {
      console.log('Error registering user', res.data)
    };

   } catch (error) {
    console.log("error during registration",error);
   }finally{
    setLoading(false)
   }
 

  }

  const toggle = () => {
    setShow(!show)
  };






  return (
    <div className='w-screen lg:w-full md:w-screen relative lg:h-[100vh] h-screen flex flex-col justify-center items-center bg'>
        <div className='flex flex-col fixed ustify-center items-left bg-white py-8 px-8 rounded-md shadow-sm md:shadow-md lg:border-blue-300 lg:border-t-2 lg:py-11'>
        
          <h1 className='ml-3 text-3xl font-bold bg-gradient-to-r from-blue-400 to bg-indigo-900 bg-clip-text  text-transparent'>Register</h1>

            <form onSubmit={submitHandler} className='flex flex-col gap-5 py-6'>
                <div className='w-full relative'>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setEmail(e.target.value)} className= {`${emailError && 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-red-50 text-sm outline-none  text-red-600 text-opacity-90 placeholder-opacity-70 placeholder-red-600' || 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-slate-50 text-sm outline-none placeholder-blue-400 text-blue-900 text-opacity-90 placeholder-opacity-70'}`} type='email' placeholder={`${emailError && 'please enter email' || 'Email'}`} /> <div className={( emailError ? 'absolute top-2 right-4 text-sm text-red-600 opacity-50 z-10' :  'absolute top-2 right-4 text-sm text-blue-400 opacity-50 z-10')}><IoMdMail/></div>
                </div>

                <div className='w-full relative'>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setUsername(e.target.value)} className= {`${usernameError && 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-red-50 text-sm outline-none  text-red-600 text-opacity-90 placeholder-opacity-70 placeholder-red-600' || 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-slate-50 text-sm outline-none placeholder-blue-400 text-blue-900 text-opacity-90 placeholder-opacity-70'}`} type='text' placeholder={`${usernameError && 'please enter username' || 'Username'}`} /> <div className={( usernameError ? 'absolute top-2 right-4 text-sm text-red-600 opacity-50 z-10' :  'absolute top-2 right-4 text-sm text-blue-400 opacity-50 z-10')}><FaUser/></div>
                </div>

                <div className='w-full relative'>
                <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=> setPassword(e.target.value)} className= {`${passwordError && 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-red-50 text-sm outline-none  text-red-600 text-opacity-90 placeholder-opacity-70 placeholder-red-600' || 'border-2 border-white  w-full rounded-lg py-1 px-4 bg-slate-50 text-sm outline-none placeholder-blue-400 text-blue-900 text-opacity-90 placeholder-opacity-70'}`}
                 type={( show === true ? 'password' : 'text')} placeholder={`${passwordError && 'please enter password' || 'Password'}`} /> <div className={( passwordError ? 'absolute top-2 right-4 text-sm text-red-600 opacity-50 z-10' :  'absolute top-2 right-4 text-sm text-blue-400 opacity-50 z-10')}><FaLock/></div>
                </div>

                <div className='w-full relative flex items-center'>
                <PhoneInput 
                  defaultCountry={'US'}
                  value={phone}
                  onCountryChange={handleCountryChange}
                  inputprops={{
                    required: true,
                  }}
                  onChange={(value) => setPhone(value)} className= {'PhoneInputInput::placeholder PhoneInputInput PhoneInputInput:focus-visible border-2 border-white  w-full rounded-lg py-1 px-4 bg-slate-50 text-sm outline-none placeholder-blue-400 text-blue-900 text-opacity-90 placeholder-opacity-70 focus:outline-none'} type='text' placeholder={`${phoneError && "Required" || "Enter phone number" }`} /> 
                  <div className={'absolute top-2 right-4 text-sm text-slate-500 opacity-50 z-10'}>{country && (<p className="text-gray-500 text-xs font-sans">{country}</p>)}
                 </div>
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
                    <span className='button-loader py-1 ml-[100px]'>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </span>):(<>
                  
                 <span className='absolute left-1/2 -translate-x-1/2 transition'>Register</span> 
                 <span className='ml-auto opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition'><MdOutlineKeyboardArrowRight/></span>
                  </>)}
                </button>

                {err && <div className='text-red-600 text-xs'>{err}</div>}
            </form>

            <div className=''>
              <span className="text-sm gap-1">Already have an account? <Link href={"/login"} className='text-sm bg-gradient-to-r from-sky-600  to-cyan-900 text-transparent bg-clip-text cursor-pointer'>Signin here</Link></span>
            </div>
        </div>
      </div>
  )
}

export default Register
