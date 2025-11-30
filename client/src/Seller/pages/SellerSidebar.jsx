import { NavLink } from 'react-router-dom'

const links = [
  { to: '/seller/dashboard', label: 'Dashboard' },
  { to: '/seller/add-product', label: 'Add Product' },
  { to: '/seller/my-products', label: 'My Products' },
  { to: '/seller/orders', label: 'Orders' },
  { to: '/seller/returns', label: 'Returns' },
  { to: '/seller/earnings', label: 'Earnings' },
  { to: '/seller/performance', label: 'Performance' },
  { to: '/seller/reviews', label: 'Reviews' },
  { to: '/seller/settings', label: 'Settings' },
  { to: '/seller/support', label: 'Support' },
]

export default function SellerSidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-full fixed top-0 left-0">
      <div className="px-4 py-6 border-b">
        <h1 className="text-2xl font-bold text-center">Seller</h1>
      </div>

      <nav className="mt-4 px-2">
        <ul className="space-y-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded text-sm ${
                    isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
