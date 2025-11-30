import { BrowserRouter } from 'react-router-dom'
import SellerRoutes from './Seller/routes/SellerRoutes'

function App() {
  return (
    <BrowserRouter>
      <SellerRoutes />
    </BrowserRouter>
  )
}

export default App