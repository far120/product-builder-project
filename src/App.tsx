import React, { useState } from "react";
import { ThemeProvider, useTheme } from "./Ui/utils/ThemeContext";
import { productList } from "./data/index";
import Card_Prouduct from "./CRUD/Read";
import Button from "./Ui/Button/Button";
import Create from "./CRUD/Create";
import { IProduct } from "./interfaces";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AppContent() {
  const { theme, setTheme, themeStyles } = useTheme();
  const [products, setproducts] = useState(productList);
  const [product, setProduct] = useState<IProduct | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isupdate, setIsUpdate] = useState(false)
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    setIsUpdate(false);
  }

  const Show_Data = products.map((product) => {
    return <Card_Prouduct key={product.id} product={product} setproducts={setproducts} update={isupdate} setupdate={setIsUpdate} setProduct={setProduct} />;
  });

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${theme === "dark" ? "theme-dark bg-[#0f2027]" : "theme-light bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-400"}`}>
      <div className={`relative min-h-screen flex flex-col ${theme === "dark" ? "bg-[#0f2027]" : "bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-400"}`}>
        {/* Sticky Theme Switcher */}
        <button
          className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-full shadow-lg font-semibold ${themeStyles.button} transition-all`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <h1 className={`text-4xl font-bold my-4 text-center ${themeStyles.text}`}>Product List</h1>
        <Button className={`w-full h-full py-2 rounded-lg transition duration-300 ${themeStyles.button}`} onClick={open}>Add Product</Button>
        {isupdate && (
          <>
            <Create openmodel={isupdate} closemodel={close} title="Update Product" products={product || undefined} setproducts={setproducts} />
          </>
        )}
        {isOpen && (
          <>
            <Create openmodel={isOpen} closemodel={close} title="Add a New Prouduct" setproducts={setproducts} />
          </>
        )}
        <div className={`grid grid-col-1 md:grid-cols-2 justify-center items-center lg:grid-cols-3 xl:grid-cols-4 gap-8 px-10 py-10 mt-8 rounded-2xl shadow-2xl ${themeStyles.card}`} style={{ maxWidth: '1600px', margin: '0 auto' }}>
          {Show_Data}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
