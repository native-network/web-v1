export const initialState = {
  tribes: {
    tribes: [],
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
  activeTribe: {
    tribe: {},
    error: '',
  },
  user: {
    wallet: {
      address: '',
      currencies: [],
    },
    tribes: [],
    addressError: '',
    sessionError: '',
  },
};
