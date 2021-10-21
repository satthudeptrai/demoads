import request from '@/utils/request';

class UserInfo {
  getUserInfo(token) {
    return request({
      url: '/v1/public/login',
      method: 'get',
      params: token,
    });
  }
}
export { UserInfo as default };