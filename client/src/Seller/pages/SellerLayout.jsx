import SellerSidebar from './SellerSidebar'
import SellerTopbar from './SellerTopbar'
import { Outlet } from 'react-router-dom'

export default function SellerLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SellerSidebar />

      <div className="flex flex-col flex-1 ml-64">
        <SellerTopbar />
        <div className="p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
