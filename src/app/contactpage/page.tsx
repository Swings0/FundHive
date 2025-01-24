'use client'
import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MdLocationPin } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [modal, setModal] = useState({ open: false, message: '', isError: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setModal({ open: false, message: '', isError: false });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      setFormData({ name: '', email: '', message: '' });
      setModal({ open: true, message: 'SENT... We will be getting back to you soon', isError: false });
    } catch (error) {
      console.error('Error submitting form:', error);
      setModal({ open: true, message: 'An error occurred. Please try again.', isError: true });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='bg5'>
      <Navbar/>
      <div className='w-full bg-cyan-600 bg-opacity-25 '>
        <div className='py-52 text-white flex flex-col  justify-center items-center'>
          <h1 className='text-5xl font-bold'>Contact Us</h1>
          <div className='flex items-center space-x-4 mt-4'>
            <p>Home </p>
            <span>-</span>
            <p>Contact us </p>
          </div>

        </div>

        <div className='bg-slate-200 lg:flex md:flex grid lg:gap-0 gap-5 items-center justify-center lg:justify-start py-20 lg:space-x-10 md:space-x-10 lg:px-8 md:px-8 '>
          <div className='lg:w-80 lg:h-36 md:w-80 md:h-36 w-96 h-32 bg-slate-100 shadow-md rounded-lg py-10 px-5'>
            <span className='inline-flex items-center text-2xl gap-2'><MdLocationPin/><h1 className='text-lg font-semibold'>Address</h1></span>
            <p className='text-sm text-slate-600'>
              Riddargatan 13A, 114 51 <br /> Stockholm, Sweden
            </p>
          </div>

          <div className='lg:w-80 lg:h-36 md:w-80 md:h-36 w-96 h-32 bg-slate-100 shadow-md rounded-lg py-10 px-5'>
            <span className='inline-flex items-center text-2xl gap-2'><MdEmail/><h1 className='text-lg font-semibold'>Email</h1></span>
            <p className='text-sm text-slate-600'>
             support@comingsoon.com
            </p>
          </div>

        </div>

        <div className="bg-slate-300 flex flex-col lg:flex-row py-12 px-6 lg:py-20 lg:px-20 md:pl-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold text-left lg:text-left">Get In Touch</h1>
          <p className="text-slate-600 text-xs md:text-sm lg:text-sm text-left lg:text-left mt-2">
            Send us a message, we&apos;ll be sure to get back to you.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex justify-center md:justify-start items-center">
            <form
              className="grid grid-cols-1 gap-3 lg:gap-6 w-full max-w-lg bg-slate-300 rounded-lg"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col lg:text-sm text-base">
                <label className="text-sm font-semibold text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="py-2 px-3 border border-slate-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 placeholder:text-xs"
                />
              </div>

            {/* Email Input */}
            <div className="flex flex-col lg:text-sm text-base">
                <label className="text-sm font-semibold text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="py-2 px-3 border border-slate-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 placeholder:text-xs"
                />
              </div>

            {/* Message Input */}
            <div className="flex flex-col lg:text-sm text-base">
                <label className="text-sm font-semibold text-gray-600 mb-2">Message</label>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="py-2 px-3 border border-slate-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 h-28"
                ></textarea>
              </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                  type="submit"
                  className="group flex items-center justify-between lg:px-7 px-4 py-2 relative border border-slate-400 text-slate-400 font-semibold rounded-md bg-slate-600 bg-opacity-0 hover:bg-opacity-55 hover:text-white hover:transition-opacity hover:border-slate-200 hover:translate-y-px ease-in-out duration-500"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="text-sm lg:text-sm animate-pulse">Submitting...</span>
                  ) : (
                    <>
                      <span className="ml-7 -translate-x-2 transition ease-in duration-75 text-center lg:text-sm text-xs">
                        Submit
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 text-white transition duration-75">
                        <MdOutlineKeyboardArrowRight />
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p className={`text-md ${modal.isError ? 'text-red-600' : 'text-green-600'}`}>{modal.message}</p>
            <button
              onClick={() => setModal({ open: false, message: '', isError: false })}
              className="mt-4 px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

        <div className=''>
          <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.9250180392637!2d18.076253676432025!3d59.33420567461665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d5afa21e747%3A0x46df839ae839b719!2sRiddargatan%2013a%2C%20114%2042%20Stockholm%2C%20Sweden!5e0!3m2!1sen!2sng!4v1734203956944!5m2!1sen!2sng"  height="450" className='border-0 w-full' loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></p>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Page
