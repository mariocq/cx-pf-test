export default {
  state: [],
  reducers: {
    'detail'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};