import { ProductType } from '../Containers/ProductCatalog/ProductCatalog';
import { CartItems } from '../Context/store';

export const increaseQuantity = (
  id: number,
  cartItems?: CartItems[],
  productsData?: ProductType[]
): { cartItems?: CartItems[]; productsData?: ProductType[] } => {
  if (productsData?.length) {
    const modifiedProductsData: ProductType[] = productsData.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    return { productsData: modifiedProductsData, cartItems: [] };
  }
  if (cartItems?.length) {
    const modifiedCartItems = cartItems.map((item) => {
      if (item.productId === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    return { productsData: [], cartItems: modifiedCartItems };
  }
  return {};
};

export const decreaseQuantity = (
  id: number,
  cartItems?: CartItems[],
  productsData?: ProductType[]
): { cartItems?: CartItems[]; productsData?: ProductType[] } => {
  if (productsData?.length) {
    const modifiedProductsData: ProductType[] = productsData.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    return { productsData: modifiedProductsData, cartItems: [] };
  }
  if (cartItems?.length) {
    const modifiedCartItems = cartItems.map((item) => {
      if (item.productId === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    return { productsData: [], cartItems: modifiedCartItems };
  }
  return {};
};
