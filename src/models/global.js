import * as usersService from '../services/users';

export default {
  state: {
    login: false,
    msg: "",
    token: "",
  },
  reducers: {
    signerror(state, { payload: { msg } }) {
      return {
        ...state,
        login: false,
        msg,
      };
    },
    signok(state, { payload: { token } }) {
      return {
        ...state,
        login: true,
        token,
      };
    },
    signout(state, { }) {
      return {
        ...state,
        login: false,
        token: "",
      };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(usersService.login, payload);
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
          yield put({
            type: 'signok',
            payload: data,
          });
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
    *logout({ }, { put }) {
      // 设置reducer
      yield put({
        type: 'signout',
      });
    },
    *throwError() {
      throw new Error('hi error');
    },
  },
}
