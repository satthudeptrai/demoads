import request from '@/utils/request';

class Campaign {
    getList() {
      return request({
        url: '/',
        method: 'post',
        params: token,
      });
    }
    create() {
      return request({
        url: '/',
        method: 'post',
        params: token,
      });
    }
  }
  export { Campaign as default };