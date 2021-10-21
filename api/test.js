import request from '@/utils/request'
import Resource from '@/api/resource';

class test extends Resource {
  constructor () {
    super('test')
  }
  list () {
    return request({
      url: 'https://srv.buysellads.com/ads/CKYD62QM.json?segment=placement:vuejsorg',
      method: 'get'
    })
  }
}
export { test as default }
