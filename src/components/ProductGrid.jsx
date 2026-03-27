import products from "../products";
import ProductItems from "./ProductItems";

function ProductGrid({ selectedCategory, search, loading, showProducts }) {
  let filteredProducts;

  if (selectedCategory === "All") {
    filteredProducts = products;
    if (search) {
      const matchedItems = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      if (matchedItems.length > 0) {
        filteredProducts = matchedItems;
      } else {
        filteredProducts = [];
      }
    }
  } else {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );

    if (search) {
      const matchedItems = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      if (matchedItems.length > 0) {
        filteredProducts = matchedItems;
      } else {
        filteredProducts = [];
      }
    }
  }
  return (
    <>
    <ProductItems filteredProducts={filteredProducts} loading={loading} search={search} showProducts={showProducts}/>
    </>
  )
}

export default ProductGrid;
