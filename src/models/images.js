import * as imagesService from '../services/images';
import StringUtils from "../utils/string";

export default {
  state: {
    realtimeData: false,
    resizeHash: "",
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        realtimeData: payload
      };
    },
    setHash(state, { payload }) {
      return {
        ...state,
        resizeHash: payload
      };
    },
  },
  effects: {
    *realtime({ payload }, { put, call }) {
      const { data } = yield call(imagesService.realtime, payload);
      if (data) {
        // 设置reducer
        yield put({
          type: 'update',
          payload: data,
        });
      }
    },
    *randomHash({ }, { put }) {
        const code = StringUtils.GetHashCode();
        yield put({
          type: 'setHash',
          payload: code,
        });
    },
  },
}
