import React, { useEffect } from "react";
import SimilarProductCard from "./SimilarProductCard";
import { useAppDispatch, useAppSelector } from "../../../../Redux Toolkit/Store";
import { getAllProducts } from "../../../../Redux Toolkit/Customer/ProductSlice";
import { useParams } from "react-router-dom";

const SmilarProduct = () => {
  const { products } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      dispatch(getAllProducts({ category: categoryId }));
    }
  }, [categoryId, dispatch]);

  return (
    <div>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 gap-y-8">
        {products.products.map((item) => (
          <div key={item._id}>
            <SimilarProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmilarProduct;
