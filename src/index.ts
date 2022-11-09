import { AxiosAdapter } from 'axios';
import Taro from '@tarojs/taro';
import {
  methodProcessor,
  dataProcessor,
  urlProcessor,
  successResProcessor,
  failResProcessor,
} from './utils';

const TaroAdapter: AxiosAdapter = (config) => {
  const {
    baseURL,
    url,
    params,
    paramsSerializer,
    headers,
    data,
    method,
    timeout,
    ...rest
  } = config;
  return new Promise((resolve, reject) => {
    const request = () =>
      Taro.request({
        url: urlProcessor(baseURL, url, params, paramsSerializer),
        header: headers,
        data: dataProcessor(data),
        method: methodProcessor(method),
        timeout: timeout,
        success: (res) => {
          successResProcessor(resolve, reject, res, config, request);
        },
        fail: (res) => {
          failResProcessor(reject, res, config, request);
        },
        ...(rest || ({} as any)),
      });
    request();
  });
};

export default TaroAdapter;
