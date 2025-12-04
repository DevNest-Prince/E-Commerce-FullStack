import { Routes, Route } from "react-router-dom";

import SellersTable from "../admin/pages/sellers/SellersTable";
import Coupon from "../admin/pages/Coupon/Coupon";
import CouponForm from "../admin/pages/Coupon/CreateCouponForm";
import GridTable from "../admin/pages/Home Page/GridTable";
import ElectronicsTable from "../admin/pages/Home Page/ElectronicsTable";
import ShopByCategoryTable from "../admin/pages/Home Page/ShopByCategoryTable";
import Deal from "../admin/pages/Home Page/Deal";

const AdminRoutes = () => {
  return (
    
    <Routes>
      {/* Default route */}
      <Route index element={<SellersTable />} />

      {/* Coupon routes */}
      <Route path="coupon" element={<Coupon />} />
      <Route path="add-coupon" element={<CouponForm />} />

      {/* Homepage section routes */}
      <Route path="home-grid" element={<GridTable />} />
      <Route path="electronics-category" element={<ElectronicsTable />} />
      <Route path="shop-by-category" element={<ShopByCategoryTable />} />
      <Route path="deals" element={<Deal />} />
    </Routes>
  );
};

export default AdminRoutes;
