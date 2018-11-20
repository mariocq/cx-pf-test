import * as usersService from '../services/users';

export default {
  state: {
    login: false,
    msg: "",
  },
  reducers: {
    signin(state, { payload: { msg } }) {
      return {
        ...state,
        login: true,
        msg,
      };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(usersService.login, payload );
      if (data) {
        // 设置reducer
        yield put({
          type: 'signin',
          payload: data,
        });
      } 
    },
    *throwError() {
      throw new Error('hi error');
    },
  },
}
