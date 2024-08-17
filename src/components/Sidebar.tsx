import axios from "axios";
import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { LucideScissorsSquareDashedBottom } from "lucide-react";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  // Fetching categories using useEffect
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<FetchResponse>(
          "https://dummyjson.com/products"
        );
        const uniqueCategories = Array.from(
          new Set(response.data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 h-screen p-6 shadow-lg bg-gray-50">
      <h1 className="mt-4 mb-10 text-2xl font-bold text-gray-900">
        React Store
      </h1>

      <section>
        <input
          type="text"
          className="w-full px-4 py-2 mb-5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          placeholder="Search product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex items-center justify-between space-x-2">
          <input
            type="number"
            className="w-full px-4 py-2 mb-5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            className="w-full px-4 py-2 mb-5 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        <h2 className="mb-3 text-xl font-bold text-gray-800">Categories</h2>
        <section className="flex flex-col space-y-2">
          {categories.map((category, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-[16px] h-[16px] text-blue-600 border-gray-300 focus:ring-blue-500"
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
              />
              <span className="text-gray-700">{category.toUpperCase()}</span>
            </label>
          ))}
        </section>

        {/* Keywords Section */}
        <div className="mt-6">
          <h2 className="mb-3 text-xl font-bold text-gray-800">Keywords</h2>
          <div className="flex flex-wrap space-x-2">
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeyword(keyword)}
                className="px-4 py-2 mb-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetFilters}
          className="w-full px-4 py-2 mt-8 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Reset Filter
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
