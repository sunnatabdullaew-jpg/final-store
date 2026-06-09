import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-900">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h2 className="text-xl font-black mb-4 tracking-tighter">FINALSTORE</h2>
          <p className="text-gray-500 text-sm">O'zbekistondagi eng premium mahsulotlar markazi.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <b className="text-white mb-2">Bo'limlar</b>
          <a href="#">Mahsulotlar</a>
          <a href="#">Mashinalar</a>
        </div>
        <div className="text-sm text-gray-500">
          <b className="text-white mb-2">Bog'lanish</b>
          <p>Toshkent, O'zbekiston</p>
          <p>+998 90 123 45 67</p>
        </div>
      </div>
      <p className="text-center text-gray-700 text-xs mt-10">© 2026 Final Store.</p>
    </footer>
  );
};

export default Footer;