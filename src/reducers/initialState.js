export const initialState = {
  communities: {
    communities: [],
    error: '',
  },
  currency: {
    currencies: [],
    error: '',
  },
  loading: 0,
  polls: {
    polls: [],
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
    communities: [],
    addressError: '',
    sessionError: '',
  },
};
