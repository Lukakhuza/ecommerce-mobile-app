import { createContext, useEffect, useState } from "react";
import { fetchProductsData } from "../../util/auth";

export const ProductsContext = createContext({
  products: {},
  selectedCategory: "",
  updateSelectedCategory: (category) => {},
});

function ProductsContextProvider({ children }) {
  const [fetchedProductsData, setFetchedProductsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function getProductsData() {
      const productsData = await fetchProductsData();
      setFetchedProductsData(productsData);
    }
    getProductsData();
  }, []);

  function updateSelectedCategory(category) {
    setSelectedCategory(category);
  }

  const value = {
    products: fetchedProductsData,
    selectedCategory: selectedCategory,
    updateSelectedCategory: updateSelectedCategory,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;
