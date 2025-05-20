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
  // Cart and Wishlist state
  const [cart, setCart] = useState<IProduct[]>([]);
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    setIsUpdate(false);
  }

  // Cart/Wishlist handlers
  function addToCart(product: IProduct) {
    setCart((prev) => prev.find((p) => p.id === product.id) ? prev : [...prev, product]);
  }
  function addToWishlist(product: IProduct) {
    setWishlist((prev) => prev.find((p) => p.id === product.id) ? prev : [...prev, product]);
  }
  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }
  function removeFromWishlist(id: string) {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  }

  const Show_Data = products.map((product) => {
    return (
      <Card_Prouduct
        key={product.id}
        product={product}
        setproducts={setproducts}
        update={isupdate}
        setupdate={setIsUpdate}
        setProduct={setProduct}
        addToCart={addToCart}
        addToWishlist={addToWishlist}
      />
    );
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
        {/* Cart/Wishlist Buttons */}
        <div className="fixed top-4 left-4 z-50 flex gap-2">
          <button className={`px-4 py-2 rounded-full font-semibold shadow ${themeStyles.button}`} onClick={() => setShowCart(true)}>
            🛒 Cart ({cart.length})
          </button>
          <button className={`px-4 py-2 rounded-full font-semibold shadow ${themeStyles.button}`} onClick={() => setShowWishlist(true)}>
            💖 Wishlist ({wishlist.length})
          </button>
        </div>
        {/* Cart Modal */}
        {showCart && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center rgba(0,0,0,0.54)] backdrop-blur-sm"
            onClick={() => setShowCart(false)}
          >
            <div
              className={`max-w-md w-full p-6 rounded-2xl shadow-2xl ${themeStyles.card} ${themeStyles.text} relative`}
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-2 right-2 text-xl" onClick={() => setShowCart(false)}>✖</button>
              <h2 className="text-2xl font-bold mb-4">Cart</h2>
              {cart.length === 0 ? <p>No items in cart.</p> : (
                <>
                  <ul className="space-y-2">
                    {cart.map((item) => (
                      <li key={item.id} className="flex justify-between items-center border-b pb-2">
                        <span>{item.title}</span>
                        <button className="text-red-500" onClick={() => removeFromCart(item.id?.toString() || "")}>Remove</button>
                      </li>
                    ))}
                  </ul>
                  {/* Total Price Calculation */}
                  <div className="mt-6 flex justify-between items-center text-lg font-semibold  pt-4">
                    <span>Total:</span>
                    <span>
                      {cart.reduce((sum, item) => sum + (typeof item.price === 'number' ? item.price : parseFloat(item.price)), 0).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {/* Wishlist Modal */}
        {showWishlist && (
            <div
            className="fixed inset-0 z-50 flex items-center justify-center rgba(0,0,0,0.54)] backdrop-blur-sm"
            onClick={() => setShowWishlist(false)}
            >
            <div
              className={`max-w-md w-full p-6 rounded-2xl shadow-2xl ${themeStyles.card} ${themeStyles.text} relative`}
              onClick={e => e.stopPropagation()}
            >
              <button className="absolute top-2 right-2 text-xl" onClick={() => setShowWishlist(false)}>✖</button>
              <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
              {wishlist.length === 0 ? <p>No items in wishlist.</p> : (
              <ul className="space-y-2">
                {wishlist.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <span>{item.title}</span>
                  <button className="text-red-500" onClick={() => removeFromWishlist(item.id?.toString() || "")}>Remove</button>
                </li>
                ))}
              </ul>
              )}
            </div>
            </div>
        )}
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
