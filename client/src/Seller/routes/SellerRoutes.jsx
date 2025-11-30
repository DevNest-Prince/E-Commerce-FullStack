import { Routes, Route, Navigate } from 'react-router-dom'
import SellerLayout from '../pages/SellerLayout'
import SellerDashboard from '../pages/SellerDashboard'
import AddProduct from '../pages/AddProduct'
import MyProducts from '../pages/MyProducts'
import EditProduct from '../pages/EditProduct'
import Orders from '../pages/Orders'
import Returns from '../pages/Returns'
import Earnings from '../pages/Earnings'
import Performance from '../pages/Performance'
import Reviews from '../pages/Reviews'
import SellerSettings from '../pages/SellerSettings'
import Support from '../pages/Support'
import SellerProfile from '../pages/SellerProfile'

export default function SellerRoutes() {
  return (
    <Routes>
      {/* Redirect root to /seller */}
      <Route path="/" element={<Navigate to="/seller" replace />} />

      <Route path="/seller" element={<SellerLayout />}>
        <Route index element={<SellerDashboard />} />
        <Route path="dashboard" element={<SellerDashboard />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="my-products" element={<MyProducts />} />
        <Route path="edit-product" element={<EditProduct />} />
        <Route path="orders" element={<Orders />} />
        <Route path="returns" element={<Returns />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="performance" element={<Performance />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<SellerSettings />} />
        <Route path="support" element={<Support />} />
        <Route path="seller-profile" element={<SellerProfile />} />
      </Route>
    </Routes>
  )
}
