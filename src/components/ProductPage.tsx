import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[]; // Corrected the images property here
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>(); // Corrected typing for useParams
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get<Product>(`http://dummyjson.com/products/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Error in fetching data: ", error);
          navigate("/not-found");
        });
    }
  }, [id, navigate]); // Added navigate to the dependency array

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-5 text-white bg-black rounded"
      >
        Back
      </button>
      <img
        src={product.images[0]} // Corrected to access the images array
        alt={product.title}
        className="w-[50%] h-auto mb-5"
      />
      <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
      <p className="mb-2 text-gray-700 w-[70%]">{product.description}</p>
      <div className="flex">
        <p className="text-lg font-semibold">Price: ${product.price}</p>
        <p className="ml-10 text-lg font-semibold">
          Rating: {product.rating}/5
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
