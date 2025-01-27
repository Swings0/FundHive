'use client'
import React from 'react'
import Layout from '../components/Layout'

const page = () => {
  return (
    <div className='h-screen lg:h-full'>
    <Layout username='Swings'>
        <div className='w-full bg-white rounded-sm shadow-sm shadow-gray-200 lg:p-6 md:p-6 p-4 mt-[-20px]'>
          <div className='flex flex-col gap-1'>
            <h1 className='flex font-medium text-md text-gray-600 lg:mb-8 md:mb-8 mb-6'>Active Withdrawel</h1>
            <div className='flex lg:gap-0 md:gap-0 gap-16 text-sm text-slate-500 justify-between border-t border-gray-100 p-1 whitespace-nowrap '><p>Active Balance</p> <p className='font-semibold mr-36'>$0.00</p></div>
            <div className='flex lg:gap-0 md:gap-0 gap-6 text-sm text-slate-500 justify-between border-t border-gray-100 p-1 whitespace-nowrap '><p>Pending Withdrawel</p> <p className='font-light mr-[179px]'>$</p></div>
          </div>

          <div className='mt-8 lg:mt-10 md:mt-10 lg:flex lg:flex-col md:flex md:flex-col gap-1 grid relative'>
             <div className='flex justify-between lg:px-9 md:px-9 px-1 border-y border-gray-100 p-1'>
              <p className='lg:text-sm md:text-sm font-medium text-slate-500 text-xs'>Processing</p>
              <p className='lg:text-sm md:text-sm font-medium text-slate-500 lg:ml-12 md:ml-12 text-xs'>Avaliable</p>
              <p className='lg:text-sm md:text-sm font-medium text-slate-500 ml-1 text-xs'>Pending</p>
              <div>
               <p className='lg:text-sm md:text-sm font-medium text-slate-500 ml-5 hidden lg:block md:block text-xs'>Account</p>
              </div>
             </div>

             <div className='flex justify-between lg:px-9 md:px-9 px-1 '>
              <p className='font-light lg:text-sm md:text-sm text-xs text-slate-500'>USDT TRC20</p>
              <p className='text-green-600 font-semibold text-xs'>$0.00</p>
              <p className='text-red-500 font-semibold text-xs'>$0.00</p>
              <div>
               <p className='font-sans text-blue-600 pr-3 hidden lg:block md:block'>not set</p>
              </div>
             </div>

             <div className='flex justify-between lg:px-9 md:px-9 px-1  border-gray-100 p-1 border-y'>
              <p className='font-light lg:text-sm md:text-sm text-xs text-slate-500'>USDT ERC20</p>
              <p className='text-green-600 font-semibold text-xs'>$0.00</p>
              <p className='text-red-500 font-semibold text-xs'>$0.00</p>
              <div>
               <p className='font-sans text-blue-600 pr-3 hidden lg:block md:block'>not set</p>
              </div>
             </div>

             <div className='flex justify-between lg:px-9 md:px-9 px-1 '>
              <p className='font-light lg:text-sm md:text-sm text-xs text-slate-500'>Bitcoin</p>
              <p className='text-green-600 font-semibold text-xs ml-9'>$0.00</p>
              <p className='text-red-500 font-semibold text-xs '>$0.00</p>
              <div>
               <p className='font-sans text-blue-600 pr-3 hidden lg:block md:block'>not set</p>
              </div>
             </div>

             <div className='w-full lg:hidden md:hidden block mt-8'>
              <div className='block lg:hidden md:hidden w-full text-xs'>
               <p className='lg:text-sm md:text-sm text-xs font-medium text-slate-500  ml-1'>Account</p>
               <p className='font-sans text-blue-600 pr-3 ml-1'>not set</p>
               <p className='font-sans text-blue-600 pr-3 ml-1'>not set</p>
                <p className='font-sans text-blue-600 pr-3 ml-1'>not set</p>
              </div>
             </div>
          </div>

          <div>
            <p className='text-xs lg:text-sm md:text-sm whitespace-nowrap font-md text-slate-500 px-3 lg:px-8 md:px-8 py-7'>
             You have no funds to withdraw.
            </p>
          </div>

        </div>
    </Layout>

    </div>
  )
}

export default page
