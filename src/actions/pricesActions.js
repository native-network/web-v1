import { priceActions as actions } from './actionTypes';
import { toastrError } from './toastrActions';
import axios from 'axios';

export const getCurrentPrices = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('//coincap.io/page/ETH');
      return dispatch(setPriceETH(data.price));
    } catch (err) {
      dispatch(toastrError('There was a problem fetching price data'));
    }
  };
};

export const setPriceETH = (price) => {
  return { type: actions.SET_PRICE_ETH, price };
};

export const setPriceNTV = (price) => {
  return { type: actions.SET_PRICE_NTV, price };
};
