import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { womenLevelTwo } from "../../../data/category/level two/womenLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLavelTwo";
import { furnitureLevelTwo } from "../../../data/category/level two/furnitureLevleTwo";
import { furnitureLevelThree } from "../../../data/category/level three/furnitureLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";

import { useNavigate } from "react-router-dom";

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: furnitureLevelThree,
};

const CategorySheet = ({ selectedCategory, toggleDrawer, setShowSheet }) => {
  const navigate = useNavigate();

  const childCategory = (category, parentId) =>
    category.filter((child) => child.parentCategoryId === parentId);

  const handleCategoryClick = (categoryId) => {
    toggleDrawer?.(false)();
    setShowSheet?.(false);
    navigate(`/products/${categoryId}`);
  };

  return (
    <div className="bg-white shadow-lg h-auto max-h-[500px] overflow-y-auto w-full">
      <div className="flex flex-wrap text-sm">
        {categoryTwo[selectedCategory]?.map((item, index) => (
          <div
            key={item.name}
            className={`p-5 sm:w-1/2 md:w-1/3 lg:w-1/5 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            {/* Level Two */}
            <h2 className="text-[#00927c] mb-4 font-semibold">{item.name}</h2>

            {/* Level Three */}
            <ul className="space-y-2">
              {childCategory(categoryThree[selectedCategory], item.categoryId).map(
                (child) => (
                  <li
                    key={child.name}
                    onClick={() => handleCategoryClick(child.categoryId)}
                    className="cursor-pointer hover:text-[#00927c]"
                  >
                    {child.name}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySheet;
