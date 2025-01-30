'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { BsClipboard, BsCheck, BsWhatsapp, BsInstagram } from "react-icons/bs";
import Layout from '../components/Layout';

const Page = () => {
  const { data: session } = useSession();
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [referrals, setReferrals] = useState(0);
  const [activeReferrals, setActiveReferrals] = useState(0);

  useEffect(() => {
    if (session?.user) {
      const userId = session.user.id;
      setReferralLink(`${window.location.origin}/signup?ref=${userId}`);
      fetchReferralData(userId);
    }
  }, [session]);

  const fetchReferralData = async (userId:string) => {
    try {
      const res = await fetch(`/api/referrals?userId=${userId}`);
      const data = await res.json();
      setReferrals(data.referrals);
      setActiveReferrals(data.activeReferrals);
    } catch (error) {
      console.error('Error fetching referral data', error);
    }
  };

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 4000); // Reset after 5 seconds

  try {
    await fetch('/api/referrals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session?.user.id }),
    });
    setReferrals((prev) => prev + 1);
  } catch (error) {
    console.error('Error updating referral count', error);
  }
 };


  return (
    <Layout username="">
    <div className="w-full  p-4 sm:p-6 bg-white shadow-sm rounded-sm mt-[-20px]">
        <h2 className="text-xl text-blue-900 font-bold mb-3 text-center sm:text-left">Refer & Earn</h2>
        <p className="text-gray-600 mb-4 text-center leading-snug sm:text-left">
            Share your referral link with friends and earn rewards when they sign up!
        </p>
        
        <div className="flex flex-col sm:flex-row items-center border border-gray-300 p-2 rounded-lg">
            <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 p-2 outline-none bg-transparent w-full sm:w-auto text-center sm:text-left"
            />
            <CopyToClipboard text={referralLink} onCopy={handleCopy}>
                <button className="p-2 text-blue-600 hover:text-lg transition-all">
                    {copied ? <BsCheck className="text-green-500 text-xl" /> : <BsClipboard />}
                </button>
            </CopyToClipboard>
        </div>
        
        <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&text=Join this amazing investment site!`} target="_blank" 
                className="bg-blue-600 text-white px-4 glass py-2 rounded-full text-sm hover:bg-blue-700 transition-all ease-in-out delay-100 duration-200">
                Share on Facebook
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Join this amazing investment site!`} target="_blank" 
                className="bg-blue-400 text-white px-4 glass py-2 rounded-full text-sm hover:bg-blue-500 transition-all ease-in-out delay-100 duration-200">
                Share on Twitter
            </a>
            <a href={`https://wa.me/?text=${encodeURIComponent(`Check this out: ${referralLink}`)}&text=Join this amazing investment site!`} target="_blank" 
                className="text-white bg-green-500 p-2 glass rounded-full text-xl flex hover:bg-green-600 transition-all ease-in-out delay-100 duration-200">
                <BsWhatsapp />
            </a>
            <a href={`https://www.instagram.com/direct/new/?text=${encodeURIComponent(`Check this out: ${referralLink}`)}&text=Join this amazing investment site!`} target="_blank" 
                className="text-white bg-pink-500 p-2 glass rounded-full text-xl flex hover:bg-pink-600 transition-all ease-in-out delay-100 duration-200">
                <BsInstagram />
            </a>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 mt-6 p-4 bg-white border rounded-lg'>
            <div className='w-full'>
                <h1 className='text-base font-semibold text-gray-600 text-center sm:text-left'>Your Referrals</h1>
                <div className='flex justify-between items-center mt-2 text-sm'>
                    <p className='text-sm md:text-base lg:text-base whitespace-nowrap'>Referrals:</p> 
                    <p className='text-gray-400 hidden lg:block md:block'>-----</p>
                    <p>{referrals}</p>
                </div> 
                <div className='flex justify-between items-center text-sm'>
                    <p className='text-sm md:text-base lg:text-base whitespace-nowrap'>Active Referrals:</p>
                    <p className='text-gray-400 hidden lg:block md:block md:mr-[3rem]'>-----</p>
                    <p>{activeReferrals}</p>
                </div>   
                <div className='flex justify-between items-center text-sm'>
                    <p className='text-sm md:text-base lg:text-base whitespace-nowrap'>Commission Earned:</p>
                    <p className='text-gray-400 hidden lg:block md:block md:mr-[3.3rem]'>-----</p>
                    <p>$0.00</p>
                </div>
            </div>
        </div>
    </div>
</Layout>
  );
};


export default Page;