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
};
