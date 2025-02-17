import React, { Suspense } from 'react';
import ResetPassword from '../components/ResetPassword';// Adjust the path to your component

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className='flex items-center justify-center bg-zinc-900 text-white'>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}