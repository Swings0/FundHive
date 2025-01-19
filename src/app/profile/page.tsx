'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Modal from '../components/Modal';
import { useRouter } from 'next/navigation';

interface PageProps {
  username: string;
}

const page = ({ username }: PageProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [fetchedUsername, setFetchedUsername] = useState<string | null>(null);
  const [registrationDate, setRegistrationDate] = useState<string | null>(null); // New state for registration date
  const [fullName, setFullName] = useState<string>('');
  const [userName, setUserName] = useState<string>(''); 
  const [newPassword, setNewPassword] = useState<string>(''); 
  const [retypePassword, setRetypePassword] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [newEmail, setNewEmail] = useState<string>(''); 
  const [usdtTrc20Address, setUsdtTrc20Address] = useState<string>(''); 
  const [usdtErc20Address, setUsdtErc20Address] = useState<string>(''); 
  const [bitcoinAddress, setBitcoinAddress] = useState<string>(''); 
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); 
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {

          const response = await axios.get('/api/getuser');
          setFetchedUsername(response.data.username || '');
          setEmail(response.data.email || '');
          setRegistrationDate(response.data.registrationDate || null); // Set registration date


          // setFetchedUsername(data.username || '');
          // setEmail(data.email || '');
          setFullName(response.data.fullname || '');
          setUserName(response.data.username || '');
          setRegistrationDate(response.data.registrationDate || null);
          setUsdtTrc20Address(response.data.usdtTrc20Address || '');
          setUsdtErc20Address(response.data.usdtErc20Address || '');
          setBitcoinAddress(response.data.bitcoinAddress || '');
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword && newPassword !== retypePassword) {
      setModalMessage('Passwords do not match.');
      setIsModalVisible(true);
      return;
    }

    const payload = {
      fullName: fullName.trim() || undefined,
      email: email.trim() || undefined,
      newEmail: newEmail.trim() || undefined,
      newPassword: newPassword || undefined,
      retypePassword: retypePassword || undefined,
      usdtTrc20Address: usdtTrc20Address.trim() || undefined,
      usdtErc20Address: usdtErc20Address.trim() || undefined,
      bitcoinAddress: bitcoinAddress.trim() || undefined,
      userName: userName.trim() || undefined,
    };

    setIsLoading(true);

    try {
      const response = await axios.post('/api/update-user', payload);

      if (response.status === 200) {
        setModalMessage(response.data.message);
        setIsModalVisible(true);

        if (response.data.message.includes('log in again')) {
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }

        setFullName('');
        setUserName('');
        setNewPassword('');
        setRetypePassword('');
        setEmail('');
        setNewEmail('');
        setUsdtTrc20Address('');
        setUsdtErc20Address('');
        setBitcoinAddress('');
      } else {
        setModalMessage('Failed to update account data.');
        setIsModalVisible(true);
      }
    } catch (error: any) {
      console.error('Error updating account data:', error.response?.data || error);
      setModalMessage(error.response?.data?.message || 'An error occurred while updating account data.');
      setIsModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const displayUsername = fetchedUsername || username;


  return (
    <Layout username={username}>
      <div className="w-full bg-blue-50 rounded-lg shadow-md p-5 mt-[-20px]">
        <div>
          <h1 className="text-sm font-semibold opacity-80">Your Account</h1>
        </div>

        <div className="flex w-full mx-auto items-center gap-5">
          <div className="p-4">
            <Image className="opacity-80" src={'/avatar3.png'} alt="" width={100} height={100} />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <div>
                <p className="text-sm opacity-70">Username:</p>
                <p className="text-xs mt-1">{displayUsername}</p>
              </div>
              <div>
                <p className="text-sm opacity-70">Registration date:</p>
                <p className="text-xs mt-1">{registrationDate ? new Date(registrationDate).toLocaleDateString() : 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-600 glass rounded-lg shadow-md p-6 mt-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <label className="text-xs text-white">Enter full name:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">Email:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">New Email:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">New Password:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {newPassword && (
            <div className="flex items-center justify-between">
              <label className="text-xs text-white">Retype Password:</label>
              <input
                className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
                type="password"
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">Your USDT TRC20 Withdrawal Address:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={usdtTrc20Address}
              onChange={(e) => setUsdtTrc20Address(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">Your USDT ERC20 Withdrawal Address:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={usdtErc20Address}
              onChange={(e) => setUsdtErc20Address(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">Your Bitcoin Withdrawal Address:</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={bitcoinAddress}
              onChange={(e) => setBitcoinAddress(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs text-white">U-name</label>
            <input
              className="bg-transparent text-blue-100 outline-none border border-blue-400 rounded-sm focus:border-white px-2 text-sm w-[60%]"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="pt-5 flex justify-end">
          <button type="submit" className={`update-btn ${isLoading ? 'loading text-white' : 'text-blue-600 bg-blue-400 glass px-4 py-2 rounded-sm font-semibold text-xs hover:bg-blue-600 hover:text-white transition-all delay-200 duration-300 ease-linear'}`}>
            {isLoading ? (
              <span className="spinner"></span> // Add a spinner when loading
            ) : (
              'Add or Change Account Data'
            )}
          </button>
          </div>
        </form>
      </div>

      <Modal
        isVisible={isModalVisible}
        message={modalMessage}
        onClose={() => setIsModalVisible(false)}
      />
    </Layout>
  );
};

export default page;



