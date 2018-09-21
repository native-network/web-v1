export const initialState = {
  communities: {
    communities: [],
    error: '',
  },
  currency: {
    loading: false,
    currencies: [],
    error: '',
  },
  loading: 0,
  polls: {
    polls: [],
    error: '',
  },
  tasks: {
    polls: [],
    error: '',
  },
  projects: {
    projects: [],
    error: '',
  },
  activeCommunity: {
    community: {},
    error: '',
  },
  user: {
    wallet: {
      address: '',
      currencies: [],
    },
    memberOf: [],
    curatorOf: [],
    addressError: '',
    sessionError: '',
  },
  prices: {
    ethUSD: '',
    ntvWei: '',
  },
};
