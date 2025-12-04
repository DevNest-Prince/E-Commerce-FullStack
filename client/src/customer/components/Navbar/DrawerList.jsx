import { useState } from "react";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";

const DrawerList = ({ toggleDrawer }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="w-64 bg-white h-full relative">
      
      {/* Logo Section */}
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-[#00927c]">Zosh Bazzar</h1>
      </div>

      {/* Category List */}
      <ul className="flex flex-col">
        {mainCategory.map((item) => (
          <li key={item.name}>
            <button
              onClick={() => setSelectedCategory(item.categoryId)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700"
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Category Sheet (Level 2/3 menu) */}
      {selectedCategory && (
        <div className="absolute top-[4.4rem] left-0 right-0 h-[450px] bg-white shadow-lg overflow-y-auto">
          <CategorySheet
            toggleDrawer={toggleDrawer}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </div>
  );
};

export default DrawerList;
