import request from '@/utils/request'

export function get_motor(query) {
  return request({
    url: '/motor/',
    method: 'get',
    params: query
  })
}

export function get_trend(id, query) {
  return request({
    url: `/motor/${id}/feature/`,
    method: 'get',
    params: query
  })
}

export function get_warning(id, query) {
  var url
  if (id === null) {
    url = '/motor/warning/'
  } else {
    url = `/motor/${id}/warning/`
  }
  return request({
    url: url,
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
    url: '/server/statu/',
    method: 'get',
    params: query
  })
}

export function get_equipgroup(query) {
  return request({
    url: '/equipgroup/',
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

export function get_packs(query) {
  return request({
    url: `/packs/`,
    method: 'get',
    params: {
      time_after: query.datarange[0],
      time_before: query.datarange[1],
      motor: query.motor
    }
  })
}

export function get_sympack(id) {
  return request({
    url: `/packs/${id}/`,
    method: 'get'
  })
}

export function get_dqpack(id) {
  return request({
    url: `/dqpacks/${id}/`,
    method: 'get'
  })
}

export function get_feature_trend(query) {
  return request({
    url: '/feature-trend/',
    method: 'get',
    params: {
      time_after: query.datarange[0],
      time_before: query.datarange[1],
      motor: query.motor
    }
  })
}

export function get_harmonicpack(id) {
  return request({
    url: `/harmonics/${id}/`,
    method: 'get'
  })
}

export function get_envelope(id) {
  return request({
    url: `/envelope/${id}/`,
    method: 'get'
  })
}

export function get_diagResult(id) {
  return request({
    url: `/diagnosis/${id}/`,
    method: 'get'
  })
}

export function get_motorCard(query) {
  return request({
    url: '/motors/card_view/',
    method: 'get',
    params: query
  })
}
