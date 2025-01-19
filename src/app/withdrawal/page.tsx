import React from 'react'
import Layout from '../components/Layout'

const page = () => {
  return (
    <Layout username='Swings'>
        <div className='w-full bg-white rounded-lg shadow-md p-6 mt-[-20px]'>
          <div className=''>
            <h1 className='flex font-medium text-md text-gray-600 mb-8'>Active Withdrawel</h1>
            <div className='flex text-sm text-slate-500 justify-between border-t border-gray-100 p-1 '><p>Active Balance</p> <p className='font-semibold mr-36'>$0.00</p></div>
            <div className='flex text-sm text-slate-500 justify-between border-t border-gray-100 p-1 '><p>Pending Withdrawel</p> <p className='font-light mr-[179px]'>$</p></div>
          </div>

          <div className='mt-10 flex flex-col gap-1'>
             <div className='flex justify-between px-9 border-y border-gray-100 p-1'>
              <p className='text-sm font-medium text-slate-500'>Processing</p>
              <p className='text-sm font-medium text-slate-500 ml-12'>Avaliable</p>
              <p className='text-sm font-medium text-slate-500 ml-1'>Pending</p>
              <p className='text-sm font-medium text-slate-500 ml-5'>Account</p>
             </div>

             <div className='flex justify-between px-9 '>
              <p className='font-light text-sm text-slate-500'>USDT TRC20</p>
              <p className='text-green-600 font-semibold text-xs'>$0.00</p>
              <p className='text-red-500 font-semibold text-xs'>$0.00</p>
              <p className='font-sans text-blue-600 pr-3'>not set</p>
             </div>

             <div className='flex justify-between px-9  border-gray-100 p-1 border-y'>
              <p className='font-light text-sm text-slate-500'>USDT ERC20</p>
              <p className='text-green-600 font-semibold text-xs'>$0.00</p>
              <p className='text-red-500 font-semibold text-xs'>$0.00</p>
              <p className='font-sans text-blue-600 pr-3'>not set</p>
             </div>

             <div className='flex justify-between px-9 '>
              <p className='font-light text-sm text-slate-500'>Bitcoin</p>
              <p className='text-green-600 font-semibold text-xs ml-10'>$0.00</p>
              <p className='text-red-500 font-semibold text-xs '>$0.00</p>
              <p className='font-sans text-blue-600 pr-3'>not set</p>
             </div>
          </div>

          <div>
            <p className='text-sm font-md text-slate-500 px-8 py-7'>
             You have no funds to withdraw.
            </p>
          </div>

        </div>
    </Layout>
  )
}

export default page
