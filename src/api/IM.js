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

export function get_pack(id, query) {
  return request({
    url: `/motor/${id}/pack/`,
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

export function get_pack_info(id, query) {
  return request({
    url: `/motor/${id}/pack/`,
    method: 'get',
    params: query
  })
}

export function patch_repair_time(eqtype, id, query) {
  var url
  if (eqtype === 'motor') {
    url = `/${eqtype}/${id}/`
  } else {
    url = `/motor/${id}/${eqtype}/`
  }
  return request({
    url: url,
    method: 'patch',
    params: query
  })
}

export function get_info(id, eqtype) {
  var url
  if (eqtype === 0) {
    url = `/motor/${id}/`
  } else {
    const typeMapper = { 1: 'bearing', 2: 'rotor', 3: 'stator' }
    const type = typeMapper[eqtype]
    url = `/${type}/${id}/`
  }
  return request({
    url: url,
    method: 'get',
    params: { info: true }
  })
}

export function get_related_info(id, eqtype) {
  var url
  if (eqtype === 0) {
    url = `/motor/${id}/`
  } else {
    const typeMapper = { 1: 'bearing', 2: 'rotor', 3: 'stator' }
    const type = typeMapper[eqtype]
    url = `/motor/${id}/${type}/`
  }
  return request({
    url: url,
    method: 'get',
    params: { info: true }
  })
}

export function get_packs(query) {
  return request({
    url: `/motor/${query.motor}/packs/`,
    method: 'get',
    params: {
      timeafter: query.datarange[0],
      timebefore: query.datarange[1]
    }
  })
}

export function get_sympack(id, pack_id) {
  return request({
    url: `motor/${id}/pack/${pack_id}/sym/`,
    method: 'get'
  })
}

export function get_dqpack(id, pack_id) {
  return request({
    url: `motor/${id}/pack/${pack_id}/dq/`,
    method: 'get'
  })
}

export function get_harmpack(id, pack_id) {
  return request({
    url: `motor/${id}/pack/${pack_id}/harmonics/`,
    method: 'get'
  })
}

export function get_envelope(id, pack_id) {
  return request({
    url: `motor/${id}/pack/${pack_id}/envelope/`,
    method: 'get'
  })
}

export function get_tsignal(id, query) {
  return request({
    url: `motor/${id}/tsignal/`,
    method: 'get',
    params: query
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
