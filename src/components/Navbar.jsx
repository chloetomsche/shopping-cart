import { useState, useEffect } from "react";
function Navbar({
  selectedCategory,
  setCategory,
  setSearch,
  search,
  setLoading,
  setShowProducts,
}) {
  const [typingValue, setTypingValue] = useState("");

  useEffect(() => {
    if (search.length > 0) {
      console.log("user is searching:..");
    }
    setTimeout(() => setShowProducts(true), 1200);
  }, [search]);

  const handleUserInput = (e) => {
    const userInput = e.target.value;
    setTypingValue(userInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(typingValue);
    setLoading(true);
    setShowProducts(false);
    setTypingValue("");
  };

  return (
    <div className="flex flex-col gap-10">
      <nav className="bg-red-700 p-4 rounded-sm ">
        <div className="flex flex-row justify-between items-center gap-10 text-white">
          <p
            className={`cursor-pointer underline-offset-8 hover:underline ${
              selectedCategory === "All" ? "underline" : ""
            }`}
            onClick={() => {
              setCategory("All");
              setSearch("");
            }}
          >
            All
          </p>
          <p
            className={`cursor-pointer underline-offset-8 hover:underline ${
              selectedCategory === "Clothing" ? "underline" : ""
            }`}
            onClick={() => {
              setCategory("Clothing");
              setSearch("");
            }}
          >
            Clothing
          </p>
          <p
            className={`cursor-pointer underline-offset-8 hover:underline ${
              selectedCategory === "Assessories" ? "underline" : ""
            }`}
            onClick={() => {
              setCategory("Assessories"), setSearch("");
            }}
          >
            Assessories
          </p>
          <p
            className={`cursor-pointer underline-offset-8 hover:underline ${
              selectedCategory === "Decor" ? "underline" : ""
            }`}
            onClick={() => {
              setCategory("Decor");
              setSearch("");
            }}
          >
            Decor
          </p>
          <p
            className={`cursor-pointer underline-offset-8 hover:underline ${
              selectedCategory === "Makeup" ? "underline" : ""
            }`}
            onClick={() => {
              setCategory("Makeup");
              setSearch("");
            }}
          >
            Makeup
          </p>
          <p
            className={`cursor-pointer underline-offset-8 hover:underline ${
              selectedCategory === "Skincare" ? "underline" : ""
            }`}
            onClick={() => {
              setCategory("Skincare");
              setSearch("");
            }}
          >
            Skincare
          </p>
        </div>
      </nav>
      <form className="flex gap-8" onSubmit={handleSubmit}>
        <input
          className="border-2 rounded-full px-2 w-xl"
          placeholder="search:"
          type="text"
          value={typingValue}
          onChange={handleUserInput}
        ></input>
        <button className="bg-gray-300 px-2 rounded-sm cursor-pointer hover:bg-gray-500">
          Go
        </button>
      </form>
    </div>
  );
}

export default Navbar;
