import { currencyActions as actions } from './actionTypes';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import {
  allCommunityContractInstances,
  communityContractInstance,
} from '../utils/constants';
import { getUserWalletBalances } from './userWalletActions';
import { toastrError, toastrSuccess } from './toastrActions';

export const sendTransactionInEth = (tokenAddress, transactionAmount) => {
  return async (dispatch) => {
    dispatch({ type: actions.SEND_TRANSACTION_IN_ETH });

    try {
      const service = getWeb3ServiceInstance();
      const { toWei } = service.web3.utils;
      const account = await service.getMainAccount();

      service.web3.eth
        .sendTransaction({
          from: account,
          to: tokenAddress,
          value: toWei(transactionAmount),
        })
        .then((receipt) => {
          dispatch(sendTransactionInEthSuccess(receipt));
          dispatch(toastrSuccess('Your purchase was successful!'));
          return dispatch(getUserWalletBalances(account));
        })
        .catch((err) => {
          const { message } = err;
          dispatch(toastrError(message));
          return dispatch(sendTransactionInEthError(message));
        });
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(sendTransactionInEthError(message));
    }
  };
};

export const sendTransactionInEthSuccess = (receipt) => {
  return {
    type: actions.SEND_TRANSACTION_IN_ETH_SUCCESS,
    receipt,
  };
};

export const sendTransactionInEthError = (error) => {
  return {
    type: actions.SEND_TRANSACTION_IN_ETH_ERROR,
    error,
  };
};

export const sendTransactionInNtv = (communityAddress, transactionAmount) => {
  return async (dispatch, getState) => {
    dispatch({ type: actions.SEND_TRANSACTION_IN_NTV });
    const { communities } = getState().communities;
    const { address } = getState().user.wallet;

    const filteredCommunities = communities.filter((community) => {
      return (
        community.name === 'Native' ||
        community.tokenAddress === communityAddress
      );
    });

    return Promise.all(allCommunityContractInstances(filteredCommunities))
      .then(async (data) => {
        const { community3: receivingCommunity } = data.find(
          ({ community3 }) =>
            community3.community.tokenAddress === communityAddress,
        );

        const { community3: sendingCommunity } = data.find(
          ({ community3 }) =>
            community3.community.tokenAddress !== communityAddress,
        );

        try {
          await sendingCommunity.approve(
            receivingCommunity.community.tokenAddress,
            transactionAmount,
            (hash) => dispatch(pendingTransactionComplete(hash)),
          );
          await receivingCommunity.buyWithToken(
            sendingCommunity.community.tokenAddress,
            transactionAmount,
            (hash) => dispatch(pendingTransactionComplete(hash)),
          );

          dispatch(getUserWalletBalances(address))
            .then(() => {
              dispatch(toastrSuccess('Your purchase was successful!'));
              dispatch(sendTransactionInNtvSuccess());
            })
            .catch((err) => {
              throw new Error(err);
            });
        } catch (err) {
          throw new Error(err);
        }
      })
      .catch((err) => {
        const { message } = err;
        dispatch(toastrError(message));
        return dispatch(sendTransactionInNtvError(message));
      });
  };
};

export const pendingTransactionComplete = (hash) => {
  return { type: 'PENDING_TRANSACTION_HASH', hash };
};

export const sendTransactionInNtvSuccess = (data) => {
  return {
    type: actions.SEND_TRANSACTION_IN_NTV_SUCCESS,
    data,
  };
};

export const sendTransactionInNtvError = (error) => {
  return {
    type: actions.SEND_TRANSACTION_IN_NTV_ERROR,
    error,
  };
};

export const stake = (community) => {
  return async (dispatch) => {
    dispatch({ type: actions.STAKE_TRANSACTION });
    const { community3 } = await communityContractInstance(community);
    try {
      await community3.approve(
        community.address,
        community.currency.minimumStake,
      );
      await community3.stake();
      dispatch(stakeSuccess());
      dispatch(
        toastrSuccess(`You have successfully staked into ${community.name}!`),
      );
    } catch (err) {
      const { message } = err;

      dispatch(toastrError(message));
      return dispatch(stakeError(message));
    }
  };
};

export const stakeSuccess = () => {
  return {
    type: actions.STAKE_TRANSACTION_SUCCESS,
  };
};

export const stakeError = (error) => {
  return {
    type: actions.STAKE_TRANSACTION_ERROR,
    error,
  };
};
