import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/features/wishlistSlice';
import { addToCart } from '../store/features/cartSlice';
import { FiHeart, FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-4 py-12">
      {wishlistItems.length === 0 ? (
        <div className="py-20 text-center">
          <FiHeart size={80} className="mx-auto text-gray-800 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Sevimlilar ro'yxati bo'sh</h2>
          <Link to="/" className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
            Mahsulotlarni ko'rish <FiArrowRight />
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-black mb-10 tracking-tighter">SEVIMLILAR</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="group bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-white transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button 
                    onClick={() => dispatch(toggleWishlist(item))}
                    className="absolute top-4 right-4 p-2 bg-white text-black rounded-full shadow-lg z-10"
                  >
                    <FiHeart size={18} fill="currentColor" />
                  </button>
                </div>
                <div className="p-6 text-white text-center">
                  <h3 className="font-bold truncate mb-3">{item.title}</h3>
                  <div className="flex justify-around items-center mb-5">
                    <b className="text-lg">{item.price.toLocaleString()} sum</b>
                  </div>
                  <button 
                    onClick={() => dispatch(addToCart(item))}
                    className="w-full py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <FiShoppingCart size={18} /> Savatga qo'shish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
