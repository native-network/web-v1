import { get } from '../requests';

export const pollStatus = (itemId, endpoint, callback) => {
  const trimmedEndpoint = endpoint.slice(0, -1).toUpperCase();
  return async (dispatch, getState) => {
    const poll = setInterval(async () => {
      dispatch({ type: `POLL_${trimmedEndpoint}_STATUS` });
      const { data } = await get(`${endpoint}/${itemId}`);
      const activeItem = (getState()[endpoint][endpoint] || []).find(
        (item) => item.id === itemId,
      );

      if (activeItem.status !== data.status) {
        clearInterval(poll);
        return dispatch(callback(data));
      }
    }, 1000 * 5);
  };
};
