import { Product } from '../types/productTypes'
import { Wishlist } from '../types/wishlistTypes'

export function isWishlisted(wishlist, product) {
  return wishlist?.products?.some((p) => p._id === product._id);
}
