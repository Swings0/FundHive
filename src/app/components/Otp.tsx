'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";




    const Otp = () => {
        let currentOTPIndex: number = 0;
        const router = useRouter();
        const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
        const [err, setErr] = useState<string | null>(null);
        const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);
        const inputRef = useRef<HTMLInputElement>(null)
        const searchParams = useSearchParams();
        const email = searchParams.get('email'); // Get the email from the query params
        const [loading, setLoading] = useState<boolean>(false)



        const handleChange = ({target}: React.ChangeEvent<HTMLInputElement>):void => {
         const {value} = target;

           const newOTP:string[] = [...otp] // spread if you don"t want to lose previous value
           newOTP[currentOTPIndex] = value.substring(value.length - 1); //always grap last value

          if(!value) setActiveOtpIndex(currentOTPIndex - 1)
          else setActiveOtpIndex(currentOTPIndex + 1);

           setOtp(newOTP)
        };

        const handleOnKeyDown = (e:React.KeyboardEvent<HTMLInputElement>,index:number) => {
            currentOTPIndex = index;
          if(e.key === 'Tab') {
            e.preventDefault();
            setActiveOtpIndex(currentOTPIndex + 1);
          }
          if(e.key === 'Backspace' && !e.currentTarget.value){
            e.preventDefault();
            setActiveOtpIndex(currentOTPIndex - 1);
          } 
        };

   
          
        const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
         const value = e.clipboardData.getData('text');


         if(isNaN(Number(value))) return false;
         
         const updatedValue = value.toString().split("").slice(0, otp.length)
         setOtp(updatedValue)
         console.log(updatedValue); 

           // Automatically blur (remove focus) after pasting
          inputRef.current?.blur();
        }
       
        // const handleOnKeyDown = ({key}:React.KeyboardEvent<HTMLInputElement>, index:number) => {
        //     currentOTPIndex = index;
        //   if(key === 'Backspace') setActiveOtpIndex(currentOTPIndex - 1);
        // };

        useEffect(()=>{
          inputRef.current?.focus();
        }, [activeOtpIndex]) // Pass activeOtpIndex as dependency to focus on the next inputref when ever state update occurs.
    
    
        console.log(otp);

       const handleVerifyOTP = async () =>{
        setLoading(true)
        try {
          const response = await fetch("/api/verify",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,otp:otp.join("") }),
          })
          
          const data = await response.json();

          console.log(response)
          if (response.status === 404) {
              setErr('User not found')
              setLoading(false)
          }
          else if (response.status == 401) {
              setErr("Otp expired")
              setLoading(false)
          }
          else if (response.status == 400) {
              setErr("Otp incorrect")
              setLoading(false)
          }
          else if(response.ok){
           // route to the login page
            router.push("/login")
          } else{
            setErr(data.error || "invalid OTP")
            setLoading(false)
          }

        } catch (error) {
           if(error instanceof Error){
            console.log(error.message)
           }
        }finally{
          setLoading(false)
        }

       
      }


   return (
    <main className='relative h-[100vh] flex flex-col justify-center  items-center bg'>
       <div className='flex flex-col items-left bg-white px-8 rounded-md shadow-blue-50 shadow-lg border-blue-300 border-t-2 lg:pt-11 lg:pb-3 pt-9 pb-1'>
            <h1 className='lg:text-lg text-sm font-semibold text-blue-400 w-full'>Enter OTP to verify your account</h1>
            <p className='lg:text-sm text-xs pb-3 text-gray-400'>OTP has been sent to your email </p>
         <form className='relative' onSubmit={handleVerifyOTP}>
              {
                otp.map((_,index) => {
                    return (
                       <React.Fragment key={index}>
                        <input 
                        ref={index === activeOtpIndex ? inputRef: null}
                        type='number'
                        value={otp[index]}
                        className='lg:w-10 lg:h-10 md:w-8 md:h-8 w-5 h-5 border-[1px] lg:rounded-sm bg-transparent outline-none text-center font-semibold lg:text-xl text-sm border-gray-400 focus:border-blue-400 focus:text-blue-400 text-gray-400 transition spin-button-none'
                        maxLength={1}
                        onKeyDown={(e) => handleOnKeyDown(e,index)}
                        onChange={handleChange}
                        onPaste={handlePaste}
                        />
                         {index < 5 && <span className='mx-2 text-gray-400'>-</span>}
                        </React.Fragment>
                    )
                })
                }
                
         </form>
         <div className='flex flex-col  py-5 gap-2 relative'>
            <button onClick={handleVerifyOTP}  className='group flex place-items-center justify-center w-full lg:px-10 lg:py-2 py-1 relative bg-blue-500  text-white font-semibold rounded-md hover:bg-blue-600 hover:translate-y-px duration-300 glass ' type='submit' disabled={loading}>
              {loading? (<span className='flex items-center justify-center'>
                <span className='button-loader py-1 ml-3'>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>): <>
              <span className='absolute left-1/2 -translate-x-1/2 transition text-sm w-full text-left pl-5'>Verify</span> 
              <span className='ml-auto opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition'><MdOutlineKeyboardArrowRight/></span>
              </>}
            </button>
            {err && <p className='text-red-500 text-xs'>{err}</p>}

            <p className='text-xs text-right text-stone-400 font-light'>OTP Expires in 5min...</p>
           </div>

       </div>
    </main>
  )
};
export default Otp
