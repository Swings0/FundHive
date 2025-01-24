'use client'
import { useState } from "react";

const Page = () => {
    const [email, setEmail] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error messages
        setErrorMessage('');
        setSuccessMessage('');

        if (!email) {
            setErrorMessage("Please enter email address");
            return;
        }

        try {
            const res = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccessMessage(data.message);
            } else {
                setErrorMessage(data.error);
            }
        } catch (error) {
            setErrorMessage("Something went wrong. Please try again later.");
             console.error("An issue occured", error);
              
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg">
            <h1 className="font-semibold text-lg font-sans px-6 text-blue-400">Forgot Password?</h1>
            <form onSubmit={handleSubmit} className="w-full py-6 px-6 lg:flex lg:flex-col items-center md:flex md:flex-col">
                <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    type="email"
                    className="outline-none border-2 border-blue-200 w-full md:w-96 lg:w-96 rounded-full focus:border-blue-300 text-blue-400 lg:text-sm md:text-sm text-base placeholder:text-center px-3 py-[5px] placeholder:text-sm placeholder:text-blue-300"
                    placeholder="Enter email address"
                />

                <div className="mt-3">
                    <button className="w-full md:w-96 lg:w-96 lg:px-6 text-center py-1 glass text-sm rounded-full text-white bg-blue-500 hover:bg-blue-600">
                        Reset Password
                    </button>
                </div>
                {<div className="text-xs text-red-600 mt-2 ml-3 md:ml-0 lg:ml-0">{errorMessage}</div>}
                {<div className="text-xs text-green-600 mt-2 ml-3 md:ml-0 lg:ml-0">{successMessage}</div>}
            </form>
        </div>
    );
};

export default Page;

