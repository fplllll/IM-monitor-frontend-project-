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
    url: '/index-trend/',
    method: 'get',
    params: query
  })
}

export function get_radar(query) {
  return request({
    url: '/index-radar/',
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
    url: '/index-calendar/',
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

export function get_tablestatu(query) {
  return request({
    url: '/index-serverstatu/',
    method: 'get',
    params: query
  })
}

export function get_treemap(query) {
  return request({
    url: '/index-treemap/',
    method: 'get',
    params: query
  })
}

export function get_motors(query) {
  return request({
    url: `/motors/`,
    method: 'get',
    params: query
  })
}

export function patch_repair_time(eqtype, id, data) {
  return request({
    url: `/${eqtype}/${id}/`,
    method: 'patch',
    data
  })
}

export function get_motor_realtime(id) {
  return request({
    url: `/motors/realtime/${id}/`,
    method: 'get'

  })
}
