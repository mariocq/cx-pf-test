import * as historyService from '../services/history';

export default {
  state: {
    history: [],
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        history: payload
      };
    },
  },
  effects: {
    *fetch({ payload }, { put, call }) {
      const { data } = yield call(historyService.fetch, payload);
      if (data.history) {
        // 设置reducer
        yield put({
          type: 'update',
          payload: data.history,
        });
      }
    },
  },
}
