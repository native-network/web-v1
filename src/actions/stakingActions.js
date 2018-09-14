/* eslint-disable */
import { stakingActions as actions } from './actionTypes';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import { communityContractInstance } from '../utils/constants';
import { toastrError, toastrSuccess } from './toastrActions';

export const stake = (community) => {
  return async (dispatch) => {
    dispatch({ type: actions.STAKE });
    const { community3 } = await communityContractInstance(community);
    try {
      // TODO Logic needed to get minimum staking - existing member balance (if exists)
      const approve = await community3.approve(
        community.address,
        community.currency.minimumStake,
      );
      const stake = await community3.stake();
      dispatch({ type: actions.STAKE_SUCCESS });
      return dispatch(
        toastrSuccess(`You have successfully staked into ${community.name}!`),
      );
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch({ type: actions.STAKE_ERROR });
    }
  };
};
