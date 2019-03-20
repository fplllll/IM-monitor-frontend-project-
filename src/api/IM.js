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

export function get_indexbar(query) {
  return request({
    url: '/index-bar/',
    method: 'get',
    params: query
  })
}

export function get_warningcalendar(query) {
  return request({
    url: '/warningcalendar/',
    method: 'get',
    params: query
  })
}

export function get_warninglog(motorid, query) {
  var url
  if (motorid === undefined) {
    url = '/warningLog/'
  } else {
    url = '/warningLog/?motor=' + motorid
  }
  return request({
    url: url,
    method: 'get',
    params: query
  })
}
