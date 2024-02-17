import { FC } from 'react';
import './productCard.css';
import deleteIcon from '../../assets/images/delete-button-svgrepo-com.svg';

interface ProductCardProps {
  imageUrl: string;
  productName: string;
  price: number;
  addToCartOnClick?: (id: number) => void;
  showOutStockMessage: boolean;
  showMaximumQtyReached: boolean;
  qtyOnClick?: (type: 'plus' | 'minus', id: number) => void;
  deleteOnClick?: (id: number) => void;
  isCheckout: boolean;
  id: number;
  qty?: number;
}
const ProductCard: FC<ProductCardProps> = ({
  deleteOnClick,
  qtyOnClick,
  addToCartOnClick,
  imageUrl,
  price,
  productName,
  isCheckout = false,
  id,
  qty,
  showOutStockMessage = false,
  showMaximumQtyReached = false,
}) => {
  return (
    <div className='card flex'>
      <p>{productName}</p>
      <div className='img-container'>
        <img width={'100%'} src={imageUrl} />
      </div>
      <div className='card-footer flex'>
        <p>{`Rs ${price}`}</p>
        {isCheckout ? (
          <>
            <div className='flex' style={{ alignItems: 'center' }}>
              <button onClick={() => qtyOnClick?.('minus', id)}>-</button>
              <p>{qty}</p>
              <button onClick={() => qtyOnClick?.('plus', id)}>+</button>
            </div>
            <button onClick={() => deleteOnClick?.(id)}>
              <img src={deleteIcon} alt='' className='delete-icon' />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              addToCartOnClick?.(id);
            }}
            disabled={showOutStockMessage || showMaximumQtyReached}>
            Add to cart
          </button>
        )}
      </div>
      {showOutStockMessage && showMaximumQtyReached && !isCheckout && (
        <p className='qty-message'>Product is out of stock</p>
      )}
      {!showOutStockMessage && showMaximumQtyReached && (
        <p className='qty-message'>Product maximum quantity reached</p>
      )}
    </div>
  );
};

export default ProductCard;
