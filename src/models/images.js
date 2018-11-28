import * as imagesService from '../services/images';

export default {
  state: {
    realtimeData: false,
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        realtimeData: payload
      };
    },
  },
  effects: {
    *realtime({ }, { put, call }) {
      const { data } = yield call(imagesService.realtime, {token:"xxx"});
      if (data) {
        // 设置reducer
        yield put({
          type: 'update',
          payload: data,
        });
      }
    },
  },
}
