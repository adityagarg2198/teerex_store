import { useEffect, useState } from 'react';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { useStoreContext } from '../../Context/store';
import './checkout.css';
import { decreaseQuantity, increaseQuantity } from '../../Utils/product.utils';

const Checkout = () => {
  const { cartItems, productData, setCartItems, setProductData } =
    useStoreContext();
  const [total, setTotal] = useState(0);

  const handleQtyOnClick = (type: 'plus' | 'minus', id: number) => {
    const currentProduct = productData.find((item) => item.id === id);
    const foundItem = cartItems.find((item) => item.productId === id);
    if (
      foundItem &&
      currentProduct &&
      foundItem.quantity < currentProduct.quantity &&
      foundItem.quantity !== 0 &&
      type === 'plus'
    ) {
      const { cartItems: modifiedCartItems } = increaseQuantity(id, cartItems);
      if (modifiedCartItems?.length) {
        setCartItems(modifiedCartItems);
      }
    } else if (foundItem && foundItem?.quantity > 1 && type === 'minus') {
      const { cartItems: modifiedCartItems } = decreaseQuantity(id, cartItems);
      if (modifiedCartItems?.length) {
        setCartItems(modifiedCartItems);
      }
    }
  };

  const handleDeleteOnClick = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.productId !== id);
    const currentItem = cartItems.find((item) => item.productId === id);
    setCartItems(updatedCartItems);
    setProductData((prevState) => {
      return [
        ...prevState.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: currentItem?.quantity ?? 0 };
          }
          return product;
        }),
      ];
    });
  };

  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((product) => {
      totalPrice = product.price * product.quantity + totalPrice;
    });
    setTotal(totalPrice);
  }, [cartItems]);

  return (
    <>
      <div className='checkout flex'>
        <div className='cart-container flex'>
          {cartItems.length
            ? cartItems.map((cartItem) => {
                const product = productData.find(
                  (product) => product.id === cartItem.productId
                );
                return product ? (
                  <ProductCard
                    id={product.id}
                    imageUrl={product.imageURL}
                    isCheckout
                    price={cartItem?.price}
                    productName={product.name}
                    key={product.id}
                    qty={cartItem.quantity}
                    qtyOnClick={handleQtyOnClick}
                    deleteOnClick={handleDeleteOnClick}
                    showMaximumQtyReached={
                      product.quantity === cartItem.quantity
                    }
                    showOutStockMessage={false}
                  />
                ) : null;
              })
            : null}
        </div>
      </div>
      <div className='cart-footer'>
        <p>Total {`Rs ${total}`}</p>
      </div>
    </>
  );
};

export default Checkout;
