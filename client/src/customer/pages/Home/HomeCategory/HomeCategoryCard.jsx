import { useNavigate } from "react-router-dom";

const HomeCategoryCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products/${item.categoryId}`)}
      className="flex flex-col items-center justify-center gap-3 group cursor-pointer"
    >
      <div className="w-[150px] lg:w-[249px] h-[150px] lg:h-[249px] rounded-full bg-teal-400 border-[9px] border-t-pink-600 border-x-gray-600 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover object-top transition-transform duration-700 transform group-hover:scale-95 rounded-full"
        />
      </div>
      <h1 className="font-medium text-center">{item.name}</h1>
    </div>
  );
};

export default HomeCategoryCard;
