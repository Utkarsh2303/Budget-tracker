import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBarsStaggered } from 'react-icons/fa6';
import { GiSplitCross } from 'react-icons/gi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
  { path: '/', name: 'Home' },
  { path: '/history', name: 'History' },  // ✅ Add comma here
  { path: '/analytics', name: 'Analytics' }
];


  return (
    <nav className="bg-black text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-xl font-bold">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dkd5a7u9g/image/upload/v1752230759/Screenshot_2025-07-11_160907_ko9gjy.png"
              alt="Logo"
              className="h-10"
            />
          </Link>
        </div>

        <ul className="hidden md:flex space-x-10 text-lg">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.path} className="hover:underline">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <GiSplitCross className="text-3xl" />
          ) : (
            <FaBarsStaggered className="text-3xl" />
          )}
        </div>
      </div>

      {isOpen && (
        <ul className="md:hidden mt-2 space-y-4 text-center bg-cyan-500 py-4 rounded">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-lg hover:underline"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
