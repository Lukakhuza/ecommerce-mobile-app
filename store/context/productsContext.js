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
      // console.log("fpc", productsData[0].image);
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

  // console.log("Selected Category: ", selectedCategory);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;
