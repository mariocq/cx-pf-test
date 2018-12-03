import * as imagesService from '../services/images';
import StringUtils from "../utils/stringUtils";

export default {
  state: {
    realtimeData: false,
    resizeHash: "", // 监听resize事件，由左侧菜单折叠触发
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
      if (data && data.msg === "ok") {
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
