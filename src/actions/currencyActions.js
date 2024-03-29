import { currencyActions as actions } from './actionTypes';
import { getWeb3ServiceInstance, sendTransaction } from '../web3/Web3Service';
import {
  allCommunityContractInstances,
  communityContractInstance,
} from '../utils/constants';
import { getUserWalletBalances } from './userWalletActions';
import { pollUserStake } from '../actions/userSessionActions';
import { toastrError, toastrSuccess } from './toastrActions';

export const sendTransactionInEth = (tokenAddress, transactionAmount) => {
  return async (dispatch) => {
    dispatch({ type: actions.SEND_TRANSACTION_IN_ETH });

    try {
      const service = getWeb3ServiceInstance();
      const { toWei } = service.web3.utils;
      const account = await service.getMainAccount();

      sendTransaction(tokenAddress, toWei(transactionAmount), (hash) =>
        dispatch(pendingTransactionComplete({ hash })),
      )
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

        sendingCommunity
          .approve(
            receivingCommunity.community.tokenAddress,
            transactionAmount,
            (hash) => {
              dispatch(
                pendingTransactionComplete({
                  message: `Purchasing ${
                    receivingCommunity.community.name
                  } Tokens. Transaction 1 of 2.`,
                  hash,
                }),
              );
            },
          )
          .then(() => {
            return receivingCommunity
              .buyWithToken(
                sendingCommunity.community.tokenAddress,
                transactionAmount,
                (hash) => {
                  dispatch(
                    pendingTransactionComplete({
                      message: `Purchasing ${
                        receivingCommunity.community.name
                      } Tokens. Transaction 2 of 2.`,
                      hash,
                    }),
                  );
                },
              )
              .then(() => {
                dispatch(sendTransactionInNtvSuccess());
              })
              .then(() => {
                dispatch(toastrSuccess('Your purchase was successful!'));
                return dispatch(getUserWalletBalances(address));
              })
              .catch((err) => {
                const { message } = err;
                dispatch(toastrError(message));
                return dispatch(sendTransactionInNtvError(message));
              });
          })
          .catch((err) => {
            const { message } = err;
            dispatch(toastrError(message));
            return dispatch(sendTransactionInNtvError(message));
          });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(toastrError(message));
        return dispatch(sendTransactionInNtvError(message));
      });
  };
};

export const pendingTransactionComplete = (transactionObject) => {
  const { message = '', hash } = transactionObject;
  return { type: 'PENDING_TRANSACTION_HASH', hash, message };
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
  return async (dispatch, getState) => {
    dispatch({ type: actions.STAKE_TRANSACTION });
    const { community3 } = await communityContractInstance(community);
    const { address } = getState().user.wallet;
    community3
      .approve(community.address, community.currency.minimumStake, (hash) => {
        dispatch(
          pendingTransactionComplete({
            message: `Staking into the ${
              community.name
            } Community. Transaction 1 of 2.`,
            hash,
          }),
        );
      })
      .then(() => {
        return community3
          .stake((hash) => {
            dispatch(
              pendingTransactionComplete({
                message: `Staking into the ${
                  community.name
                } Community. Transaction 2 of 2.`,
                hash,
              }),
            );
          })
          .then(() => {
            let stakeConfirmationInterval;
            dispatch(stakeSuccess());
            dispatch(pollUserStake(stakeConfirmationInterval));
          })
          .then(() => {
            dispatch(
              toastrSuccess(
                `You have been staked into ${
                  community.name
                }, pending confirmation.`,
              ),
            );
            return dispatch(getUserWalletBalances(address));
          })
          .catch((err) => {
            const { message } = err;
            dispatch(toastrError(message));
            return dispatch(stakeError(message));
          });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(toastrError(message));
        return dispatch(stakeError(message));
      });
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
