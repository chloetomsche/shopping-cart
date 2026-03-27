import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [selectedCategory, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProducts, setShowProducts] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <>
      <div className="min-h-screen w-full flex justify-center px-6 py-10">
        <div className="w-full max-w-7xl flex flex-col items-center gap-12">
          <div className="flex gap-12">
            <Navbar
              setCategory={setCategory}
              selectedCategory={selectedCategory}
              search={search}
              setSearch={setSearch}
              setLoading={setLoading}
              setShowProducts={setShowProducts}
            />
            <Cart />
          </div>
          <ProductGrid
            selectedCategory={selectedCategory}
            search={search}
            loading={loading}
            showProducts={showProducts}
            setLoading={setLoading}
          />
        </div>
      </div>
    </>
  );
}

export default App;
