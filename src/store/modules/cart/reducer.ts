import produce from 'immer';
import { Reducer } from 'redux';
import { ActionsTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};
const cart: Reducer<ICartState> = (
  state = INITIAL_STATE,
  action,
) => produce(state, (draft) => {
  switch (action.type) {
    case ActionsTypes.addProductToCartSuccess: {
      const { product } = action.payload;
      const productInCartIndex = draft.items
        .findIndex((item) => item.product.id === product.id);

      if (productInCartIndex >= 0) {
        // eslint-disable-next-line no-param-reassign
        draft.items[productInCartIndex].quantity += 1;
      } else {
        draft.items.push({ product, quantity: 1 });
      }

      break;
    }
    case ActionsTypes.addProductToCartFailure: {
      const { productId } = action.payload;

      draft.failedStockCheck.push(productId);

      break;
    }
    default: {
      return draft;
    }
  }

  return draft;
});

export default cart;
