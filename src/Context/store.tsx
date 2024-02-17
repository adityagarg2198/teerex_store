import { FC, ReactNode, createContext, useContext, useState } from 'react';
import { ProductType } from '../Containers/ProductCatalog/ProductCatalog';

interface StoreContextProviderType {
  children: ReactNode;
}

interface AppliedFilters {
  gender?: Map<string, number>;
  color?: Map<string, number>;
  priceRange?: Map<string, number>;
  type?: Map<string, number>;
}

export interface CartItems {
  productId: number;
  quantity: number;
  price: number;
}
interface StoreContext {
  cartItems: CartItems[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
  productData: ProductType[];
  setProductData: React.Dispatch<React.SetStateAction<ProductType[]>>;
  appliedFilters: AppliedFilters;
  setAppliedFilters: React.Dispatch<React.SetStateAction<AppliedFilters>>;
}

const initialStoreValue: StoreContext = {
  cartItems: [],
  setCartItems: () => {},
  productData: [],
  setProductData: () => {},
  appliedFilters: {},
  setAppliedFilters: () => {},
};

export const StoreContext = createContext<StoreContext>(initialStoreValue);

const StoreProvider: FC<StoreContextProviderType> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItems[]>(
    initialStoreValue.cartItems
  );
  const [productData, setProductData] = useState<ProductType[]>(
    initialStoreValue.productData
  );
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(
    initialStoreValue.appliedFilters
  );
  const value = {
    cartItems,
    productData,
    setCartItems,
    setProductData,
    appliedFilters,
    setAppliedFilters,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider');
  }
  return context;
};

export default StoreProvider;
