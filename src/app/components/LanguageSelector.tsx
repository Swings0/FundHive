"use client"
import { IoLanguage } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

type LanguageType = "en" | "es" | "fr" | "de";
export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const {language, setLanguage} = useLanguage();

  const toggleSelector = () => setIsOpen((prev) => !prev);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as LanguageType);
  };

  

  return (
    <div className="fixed bottom-12 right-16 z-50">
      <button
        onClick={toggleSelector}
        className="p-2 bg-black glass hover:bg-blue-800 transition-all duration-200 text-white shadow-lg border-2 border-white rounded-md focus:outline-none"
      >
        <IoLanguage size={20} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="mt-2 bg-gray-900 shadow-lg rounded-md p-1"
          >
            <select
              value={language}
              onChange={handleChange}
              className="bg-gray-950 text-white glass p-2 rounded-md shadow-sm outline-none cursor-pointer w-32 transition-all duration-200 hover:bg-black"
            >
              <option className="text-sm" value="en">
                English
              </option>
              <option className="text-sm" value="es">
                Español
              </option>
              <option className="text-sm" value="fr">
                Français
              </option>
              <option className="text-sm" value="de">
                Deutsch
              </option>
            </select>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

