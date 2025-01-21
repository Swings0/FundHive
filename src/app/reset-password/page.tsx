import React, { Suspense } from 'react';
import ResetPassword from '../components/ResetPassword';// Adjust the path to your component

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}