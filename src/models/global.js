import * as usersService from '../services/users';

export default {
  state: {
    login: false,
    msg: "",
    token: "",
    id: "",
    profile: {},
    record: null,
  },
  reducers: {
    signerror(state, { payload: { msg } }) {
      return {
        ...state,
        login: false,
        msg,
      };
    },
    signok(state, { payload: { token, profile, id } }) {
      return {
        ...state,
        login: true,
        token,
        id,
        profile,
      };
    },
    signout(state, { }) {
      return {
        ...state,
        login: false,
        token: "",
        id: "",
        profile: {},
        record: null,
      };
    },
    updateRecord(state, { payload: { records } }) {
      return {
        ...state,
        records,
      };
    },
  },
  effects: {
    *login({ payload, callback }, { call, put }) {
      let { data } = yield call(usersService.login, payload);
      if (data) {
        // 设置reducer
        if (data.msg !== "ok") {
          // 登录失败
          yield put({
            type: 'signerror',
            payload: data,
          });
        }
        else {
          // 登录成功
          data.id = payload.user;
          yield put({
            type: 'signok',
            payload: data,
          });
        }
      }
    },
    *setpassword({ payload, callback, onError }, { call, put }) {
      const { data } = yield call(usersService.setpassword, payload);
      if (data) {
        // 设置reducer
        if (data.msg !== "ok") {
          onError(data);
        }
        else {
          callback(data);
        }
      }
    },
    *clearmsg({ }, { put }) {
      // 设置reducer
      yield put({
        type: 'signerror',
        payload: { msg: "" },
      });
    },
    *logout({ payload }, { put, call }) {
      const { data } = yield call(usersService.logout, payload);
      if (data) {
        // 设置reducer
        if (data.msg === "ok") {
          // 退出成功
          yield put({
            type: 'signout',
          });
        }
      }
    },
    *getRecord({ payload = {} }, { put, call, select }) {
      const token = yield select(state => state.global.token);
      const account = yield select(state => state.global.id);
      payload.token = token;
      payload.account = account;
      const { data } = yield call(usersService.record, payload);
      yield put({
        type: 'updateRecord',
        payload: data,
      });
    },
    *throwError() {
      throw new Error('hi error');
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/profile') {
          // 获取登录日志
          dispatch({
            type: 'getRecord'
          });
        }
      });
    },
  }
}
