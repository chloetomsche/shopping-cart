import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [selectedCategory, setCategory] = useState("All");

  return (
    <>
      <div className="min-h-screen w-full flex justify-center px-6 py-10">
        <div className="w-full max-w-7xl flex flex-col items-center gap-12">
          <Cart />
          <Navbar
            setCategory={setCategory}
            selectedCategory={selectedCategory}
          />
          <ProductGrid selectedCategory={selectedCategory} />
        </div>
      </div>
    </>
  );
}

export default App;
