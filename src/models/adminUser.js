import * as adminUserService from '../services/adminUser';

export default {
  state: {
    list: null,
    detail: false,
  },
  reducers: {
    updateList(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    },
  },
  effects: {
    *fetch({ payload = {} }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminUserService.fetch, payload);
      if (data.msg === "ok") {
        // 设置reducer
        yield put({
          type: 'updateList',
          payload: data,
        });
      }
    },
    *add({ payload, callback }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminUserService.add, payload);
      callback(data);
    },
    *edit({ payload, callback }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminUserService.edit, payload);
      callback(data);
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/user') {
          // 获取用户列表
          dispatch({
            type: 'fetch'
          });
          // 获取用户组列表
          dispatch({
            type: 'adminGroup/fetch'
          });
        }
      });
    },
  }
}
