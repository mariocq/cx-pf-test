import fetch from 'dva/fetch';
import { Modal } from 'antd';
import router from 'umi/router';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, options);

  checkStatus(response);

  const data = await response.json();

  const ret = {
    data,
    headers: {},
  };

  if (data.msg === "token is invalid or expired") {
    Modal.error({
      title: "错误",
      content: data.msg,
    })
  } else if (data.msg !== "ok") {
    Modal.error({
      title: "错误",
      content: "登录超时，请重新登录",
      onOk: ()=>{
        router.push("/login");
      }
    })
  } else {
    return ret;
  }
}
