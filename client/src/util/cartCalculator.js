import { CartItem } from '../types/cartTypes'

export const sumCartItemSellingPrice = (items) => {
  return items.reduce((acc, item) => {
    return (item?.sellingPrice || 0) + acc;
  }, 0);
};

export const sumCartItemMrpPrice = (items) => {
  return items.reduce((acc, item) => {
    return (item?.mrpPrice || 0) + acc;
  }, 0);
};
