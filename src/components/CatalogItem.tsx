import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addProductToCart } from 'src/store/modules/cart/actions';
import { IProduct } from 'src/store/modules/cart/types';

interface CatalogItemProps {
    product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }: CatalogItemProps) => {
  const dispatch = useDispatch();
  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCart(product));
  }, [dispatch, product]);

  return (
    <article key={product.id}>
      <strong>{product.title}</strong>
      {' - '}
      <span>{product.price}</span>
      {'  '}

      <button
        type="button"
        onClick={handleAddProductToCart}
      >
        Comprar
      </button>
    </article>
  );
};

export default CatalogItem;
