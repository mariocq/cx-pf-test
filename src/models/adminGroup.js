import * as adminGroupService from '../services/adminGroup';

export default {
  state: {
    list: null,
    rights: [],
  },
  reducers: {
    updateList(state, { payload: { groups } }) {
      return {
        ...state,
        list: groups
      };
    },
    updateRights(state, { payload: { rights } }) {
      return {
        ...state,
        rights
      };
    },
  },
  effects: {
    *fetch({ payload = {} }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminGroupService.fetch, payload);
      // 设置reducer
      yield put({
        type: 'updateList',
        payload: data,
      });
    },
    *add({ payload, callback }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminGroupService.add, payload);
      callback(data);
    },
    *edit({ payload, callback }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminGroupService.edit, payload);
      callback(data);
    },
    *delete({ payload, callback }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminGroupService.del, payload);
      callback(data);
    },
    *getRights({ payload = {} }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      payload.token = token;
      const { data } = yield call(adminGroupService.getRights, payload);
      // 设置reducer
      yield put({
        type: 'updateRights',
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/group') {
          dispatch({
            type: 'fetch'
          });
          dispatch({
            type: 'getRights'
          });
        }
      });
    },
  }
}
