import * as historyService from '../services/history';

export default {
  state: {
    history: [],
    detail: {},
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        history: payload
      };
    },
    updateDetail(state, { payload }) {
      return {
        ...state,
        detail: payload
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
    *detail({ payload }, { put, call }) {
      const { data } = yield call(historyService.detail, payload);
      if (data) {
        // 设置reducer
        yield put({
          type: 'updateDetail',
          payload: data,
        });
      }
    },
  },
}
