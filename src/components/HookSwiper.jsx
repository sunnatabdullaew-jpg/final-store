import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/features/cartSlice";
import { toggleWishlist } from "../store/features/wishlistSlice";
import { useGetProductsQuery, useGetCarsQuery, useGetCategoriesQuery } from "../store/api/apiSlice";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../style/slider.css";

import { NavLink, useLocation, useParams } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";

const HookSwiper = ({ type = "products" }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id: categoryId } = useParams();
  const wishlist = useSelector((state) => state.wishlist.items);

  const { data: categories = [] } = useGetCategoriesQuery();
  const productsResult = useGetProductsQuery(undefined, { skip: type !== "products" });
  const carsResult = useGetCarsQuery(undefined, { skip: type !== "cars" });

  let data = type === "cars" ? carsResult.data || [] : productsResult.data || [];
  const isLoading = type === "cars" ? carsResult.isLoading : productsResult.isLoading;

  if (categoryId) {
    data = data.filter(item => item.categoryId === parseInt(categoryId));
  }

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  if (isLoading) return <div className="text-center py-20 text-white text-2xl animate-pulse">Yuklanmoqda...</div>;

  return (
    <div className="bg-black py-16 transition-all duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-6 py-2 rounded-full cursor-pointer transition-all duration-300 font-medium border ${
                isActive && !categoryId
                  ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                  : "text-white border-gray-700 hover:border-white"
              }`
            }
          >
            Barchasi
          </NavLink>
          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={cat.name === "Mashinalar" ? "/cars" : `/category/${cat.id}`}
              className={({ isActive }) =>
                `px-6 py-2 rounded-full cursor-pointer transition-all duration-300 font-medium border ${
                  isActive || (categoryId && parseInt(categoryId) === cat.id)
                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "text-white border-gray-700 hover:border-white"
                }`
              }
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </NavLink>
          ))}
        </div>

        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">
            {categoryId 
              ? categories.find(c => c.id === parseInt(categoryId))?.name 
              : type === "cars" ? "Premium Mashinalar" : "Saralangan Mahsulotlar"}
          </h2>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-6 text-xl">Ushbu kategoriyada mahsulotlar topilmadi.</p>
            <NavLink to="/" className="px-8 py-3 bg-white text-black font-bold rounded-xl">
              Barcha mahsulotlarga qaytish
            </NavLink>
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={25}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            className="pb-16"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-white transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <button 
                      onClick={() => dispatch(toggleWishlist(item))}
                      className={`absolute top-4 right-4 p-2 backdrop-blur-md rounded-full transition-all duration-300 z-10 ${
                        isInWishlist(item.id) 
                          ? "bg-white text-black" 
                          : "bg-black/50 text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      <FiHeart size={18} fill={isInWishlist(item.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="p-6 text-white text-center">
                    <h3 className="font-bold truncate mb-3">{item.title}</h3>
                    <div className="flex justify-around items-center mb-5">
                      {item.oldPrice && (
                        <s className="text-gray-500 text-sm">{item.oldPrice.toLocaleString()}</s>
                      )}
                      <b className="text-lg">{item.price.toLocaleString()} sum</b>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl active:scale-95 transition-all border border-gray-800 hover:border-white">
                        Batafsil
                      </button>
                      <button 
                        onClick={() => dispatch(addToCart(item))}
                        className="p-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      >
                        <FiShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HookSwiper;
