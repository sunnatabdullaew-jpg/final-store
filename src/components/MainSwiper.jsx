import { useEffect, useRef, useState } from "react";
import { useGetBannersQuery } from "../store/api/apiSlice";

const HeroSwiper = () => {
  const { data = [] } = useGetBannersQuery();
  const sectionRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSwipe, setIsSwipe] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const isThirdBanner = isSwipe === 2;
  const isSmallBanner = !isScrolled || isThirdBanner;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollInHero = Math.max(0, window.scrollY - sectionTop);
      const sectionEnd = sectionTop + sectionHeight - window.innerHeight;

      setIsScrolled(scrollInHero > 100);
      setIsAtEnd(window.scrollY >= sectionEnd - 1);

      const slide = Math.floor(scrollInHero / window.innerHeight);
      setIsSwipe(Math.max(0, Math.min(slide, data.length - 1)));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [data.length]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full"
      style={{ height: `${Math.max(data.length * 100, 100)}vh` }}
    >
      <div
        className="overflow-hidden"
        style={{
          position: isAtEnd ? "absolute" : "fixed",
          width: isSmallBanner ? "80%" : "100%",
          height: isSmallBanner ? "80vh" : "100vh",
          top: isAtEnd ? `calc(100% - 100vh + ${isSmallBanner ? "100px" : "0px"})` : isSmallBanner ? "100px" : "0",
          left: isSmallBanner ? "10%" : "0",
          transition: isAtEnd ? "none" : "all 500ms ease-in-out",
        }}
      >
        {data.map((item, index) => (
          <div
            key={item.id}
            className="absolute transition-all duration-700 ease-in-out w-full h-full"
            style={{
              left: `${index * 100 - isSwipe * 100}%`,
              top: 0,
              borderRadius: isSmallBanner ? "20px" : "0",
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white">
              <h1 className="text-5xl font-black">{item.title}</h1>
              <button className="mt-5 px-8 py-3 bg-white text-black font-bold rounded-full">{item.ctaText}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSwiper;
