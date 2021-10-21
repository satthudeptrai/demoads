import request from '@/utils/request';

class CommonApi {
    callApi(data) {
      return request({
        url: '/v1/app/campaign',
        method: 'post',
        data: data,
      });
    }
    search(data) {
      return request({
        url: '/v1/app/ads',
        method: 'post',
        data: data,
      });
    }
  }
  export { CommonApi as default };