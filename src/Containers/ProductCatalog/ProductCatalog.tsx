import { useEffect, useState } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import ProductCard from '../../Components/ProductCard/ProductCard';
import './productCatalog.css';
import Loader from '../../Components/Loader/Loader';
import { useStoreContext } from '../../Context/store';
import { increaseQuantity } from '../../Utils/product.utils';

export interface ProductType {
  color: string;
  currency: string;
  gender: string;
  id: number;
  imageURL: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
}

const ProductCatalog = () => {
  const {
    setCartItems,
    cartItems,
    productData,
    setProductData,
    appliedFilters,
  } = useStoreContext();
  const [data, setData] = useState<ProductType[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addToCartOnClick = (id: number) => {
    const foundItem = cartItems.find((item) => item.productId === id);
    const currentProduct = data.find((product) => product.id === id);
    if (currentProduct?.quantity !== 0) {
      const { productsData: modifiedProductsData } = increaseQuantity(
        id,
        [],
        data
      );
      if (modifiedProductsData?.length) {
        setData(modifiedProductsData);
      }
      if (foundItem) {
        const { cartItems: modifiedCartItems } = increaseQuantity(
          id,
          cartItems
        );
        if (modifiedCartItems?.length) {
          setCartItems(modifiedCartItems);
        }
      } else {
        setCartItems((prevState) => {
          return [
            ...prevState,
            {
              productId: id,
              quantity: 1,
              price: currentProduct?.price ?? 0,
            },
          ];
        });
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json'
        );
        const data: ProductType[] = await response.json();
        if (data.length) {
          setProductData(data);
          setData(data);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    if (!productData.length) {
      fetchProducts();
    }
  }, [setProductData]);

  useEffect(() => {
    let searchedItems: ProductType[] = [];
    let searchTerm: string[] = [];
    if (appliedFilters.priceRange?.size) {
      appliedFilters.priceRange.forEach((_, key) => {
        switch (key) {
          case '0-Rs250': {
            searchedItems = productData
              .filter((item) => item.price >= 0 && item.price <= 250)
              .concat(searchedItems);
            break;
          }
          case 'Rs251-450': {
            searchedItems = productData
              .filter((item) => item.price >= 251 && item.price < 450)
              .concat(searchedItems);
            break;
          }
          case 'Rs 450': {
            searchedItems = productData
              .filter((item) => item.price === 450)
              .concat(searchedItems);
            break;
          }
        }
      });
    } else {
      if (appliedFilters.color?.size) {
        searchTerm = [...appliedFilters.color.keys()]
          .map(String)
          .concat(searchTerm);
      }
      if (appliedFilters.gender?.size) {
        searchTerm = [...appliedFilters.gender.keys()]
          .map(String)
          .concat(searchTerm);
      }
      if (appliedFilters.type?.size) {
        searchTerm = [...appliedFilters.type.keys()]
          .map(String)
          .concat(searchTerm);
      }
      searchedItems = productData
        .filter((product) => {
          return Object.values(product).some((value) => {
            if (typeof value === 'string') {
              const regex = new RegExp(`\\b(${searchTerm.join('|')})\\b`, 'gi');
              return regex.test(value);
            }
          });
        })
        .concat(searchedItems);
    }
    if (searchedItems?.length) {
      setData(searchedItems);
    }
  }, [appliedFilters, productData]);

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className='product-catalog flex'>
      <SearchBar
        setData={(value) => {
          if (value.length) {
            setData(value);
            setNotFound(false);
          } else {
            setNotFound(true);
            setData([]);
          }
        }}
      />
      {Boolean(data.length > 0) && (
        <div className='product-container flex'>
          {data.map((product) => {
            const actualProduct = productData.find(
              (item) => item.id === product.id
            );
            return (
              <ProductCard
                addToCartOnClick={addToCartOnClick}
                imageUrl={product.imageURL}
                price={product.price}
                productName={product.name}
                key={product.id}
                isCheckout={false}
                id={product.id}
                showMaximumQtyReached={product.quantity === 0}
                showOutStockMessage={actualProduct?.quantity === 0}
              />
            );
          })}
        </div>
      )}
      {notFound && <p className='not-found'>No Matching Product Found</p>}
    </div>
  );
};

export default ProductCatalog;
