function Navbar({ selectedCategory, setCategory }) {
  
  return (
    <nav className="bg-red-700 p-4 rounded-sm ">
      <div className="flex flex-row justify-between items-center gap-10 text-white">
        <p
          className={`cursor-pointer underline-offset-8 hover:underline ${
            selectedCategory === "All" ? "underline" : ""
          }`}
          onClick={() => setCategory("All")}
        >
          All
        </p>
        <p
          className={`cursor-pointer underline-offset-8 hover:underline ${
            selectedCategory === "Clothing" ? "underline" : ""
          }`}
          onClick={() => setCategory("Clothing")}
        >
          Clothing
        </p>
        <p
          className={`cursor-pointer underline-offset-8 hover:underline ${
            selectedCategory === "Assessories" ? "underline" : ""
          }`}
          onClick={() => setCategory("Assessories")}
        >
          Assessories
        </p>
        <p
          className={`cursor-pointer underline-offset-8 hover:underline ${
            selectedCategory === "Decor" ? "underline" : ""
          }`}
          onClick={() => setCategory("Decor")}
        >
          Decor
        </p>
        <p
          className={`cursor-pointer underline-offset-8 hover:underline ${
            selectedCategory === "Makeup" ? "underline" : ""
          }`}
          onClick={() => setCategory("Makeup")}
        >
          Makeup
        </p>
        <p
          className={`cursor-pointer underline-offset-8 hover:underline ${
            selectedCategory === "Skincare" ? "underline" : ""
          }`}
          onClick={() => setCategory("Skincare")}
        >
          Skincare
        </p>
      </div>
    </nav>
  );
}

export default Navbar;
