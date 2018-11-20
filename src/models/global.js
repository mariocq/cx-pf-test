import * as usersService from '../services/users';

export default {
  state: {
    login: false,
  },
  reducers: {
    signin(state) {
      return {
        ...state,
        login: true,
      };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(usersService.login, payload );
      console.log(data);

      // 设置reducer
      yield put({
        type: 'signin'
      });
    },
    *throwError() {
      throw new Error('hi error');
    },
  },
}
