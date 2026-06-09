import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/features/cartSlice';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      {cartItems.length === 0 ? (
        <div className="py-20 text-center">
          <FiShoppingBag size={80} className="mx-auto text-gray-800 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Savatchangiz bo'sh</h2>
          <p className="text-gray-500 mb-8">Hali hech narsa qo'shmadingiz. Xaridni boshlang!</p>
          <Link to="/" className="inline-block bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
            Asosiy sahifaga qaytish
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-black mb-10 tracking-tighter">SAVATCHA</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-[#111] border border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-6 items-center hover:border-gray-600 transition-all">
                  <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-xl" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">Omborda mavjud</p>
                    <div className="flex items-center justify-center sm:justify-start gap-4">
                      <div className="flex items-center bg-black border border-gray-800 rounded-lg overflow-hidden">
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="p-2 hover:bg-[#222] transition-all"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-10 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="p-2 hover:bg-[#222] transition-all"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{(item.price * item.quantity).toLocaleString()} sum</p>
                    <p className="text-gray-500 text-xs">{item.price.toLocaleString()} sum / dona</p>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => dispatch(clearCart())}
                className="text-gray-500 hover:text-white transition-all text-sm font-medium"
              >
                Savatchani tozalash
              </button>
            </div>
            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 h-fit lg:sticky lg:top-24">
              <h2 className="text-2xl font-bold mb-6">Buyurtma xulosasi</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-400">
                  <span>Mahsulotlar ({cartItems.length})</span>
                  <span>{subtotal.toLocaleString()} sum</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Yetkazib berish</span>
                  <span className="text-green-500">Bepul</span>
                </div>
                <div className="h-px bg-gray-800 my-4"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Jami:</span>
                  <span>{subtotal.toLocaleString()} sum</span>
                </div>
              </div>
              <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 transition-all">
                BUYURTMA BERISH
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
