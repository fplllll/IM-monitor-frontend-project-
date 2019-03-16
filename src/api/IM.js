import request from '@/utils/request'

export function get_statunum(query) {
  return request({
    url: '/imstatus/',
    method: 'get',
    params: query
  })
}

export function get_trend(query) {
  return request({
    url: '/trend/',
    method: 'get',
    params: query
  })
}

export function get_radar(query) {
  return request({
    url: '/dashboard-radar/',
    method: 'get',
    params: query
  })
}
