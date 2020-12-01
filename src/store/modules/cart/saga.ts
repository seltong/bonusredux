import {
  all, takeLatest, select, call, put,
} from 'redux-saga/effects';
import api from 'src/services/api';
import { AxiosResponse } from 'axios';
import { IState } from 'src/store/types';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';

type CHeckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CHeckProductStockRequest) {
  const { product } = payload;
  const currentQuantity: number = yield select(
    (state: IState) => state.cart.items.find(
      (item) => item.product.id === product.id,
    )?.quantity ?? 0,
  );

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock),
]);
