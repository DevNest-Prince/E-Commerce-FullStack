import React from 'react';
import { useNavigate } from 'react-router-dom';

const DealCard = ({ deal }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${deal.category.categoryId}`)}
      className="w-full cursor-pointer"
    >
      <img
        className="border-x-[7px] border-t-[7px] border-pink-600 w-full h-48 object-cover object-top"
        src={deal.category.image}
        alt={deal.category.name || 'Deal Image'}
      />
      <div className="border-4 border-black bg-black text-white p-2 text-center">
        <p className="text-2xl font-bold">{deal.discount}% OFF</p>
        <p className="text-lg">Shop Now</p>
      </div>
    </div>
  );
};

export default DealCard;
