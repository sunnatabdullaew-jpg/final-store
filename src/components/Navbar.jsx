import React from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 h-20 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-white font-black text-xl tracking-tighter cursor-pointer">
              FINAL<span className="text-gray-500">STORE</span>
            </h1>
          </Link>
          
          <div className="hidden lg:flex gap-6">
            <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-all">Bosh sahifa</Link>
          </div>
        </div>

        <div className="hidden md:block flex-1 max-w-md mx-10 relative">
          <FiSearch className="absolute left-4 top-3 text-gray-500" />
          <input
            type="text"
            className="w-full pl-11 py-2 bg-[#111] border border-gray-800 rounded-lg text-white outline-none focus:border-white transition-all"
            placeholder="Search products..."
          />
        </div>

        <div className="flex gap-3 items-center">
          <FiSearch className="md:hidden text-white cursor-pointer" size={22} />
          
          <Link to="/wishlist" className="relative p-2.5 bg-[#111] rounded-lg text-white border border-gray-800 hover:border-white transition-all">
            <FiHeart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-2.5 bg-white rounded-lg text-black hover:bg-gray-200 transition-all">
            <FiShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="flex items-center gap-2 text-white bg-[#111] px-4 py-2.5 rounded-lg border border-gray-800 hover:border-white transition-all ml-2">
            <FiUser /> <span className="hidden sm:inline">Kirish</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
