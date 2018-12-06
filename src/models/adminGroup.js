import * as adminGroupService from '../services/adminGroup';

export default {
  state: {
    list: null,
  },
  reducers: {
    updateList(state, { payload: { groups } }) {
      return {
        ...state,
        list: groups
      };
    },
  },
  effects: {
    *fetch({ payload = {} }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminGroupService.fetch, payload);
      if (data.msg === "ok") {
        // 设置reducer
        yield put({
          type: 'updateList',
          payload: data,
        });
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/group') {
          dispatch({
            type: 'fetch'
          });
        }
      });
    },
  }
}
