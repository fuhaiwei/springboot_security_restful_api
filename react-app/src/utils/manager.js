import request from './request'
import md5 from 'md5'

export class Manager {

  constructor(path) {
    this.path = path
  }

  request(path, init) {
    return request(path, init)
  }

  findAll(query) {
    if (query) {
      return this.request(`${this.path}?${query}`)
    } else {
      return this.request(this.path)
    }
  }

  getOne(id) {
    return this.request(`${this.path}/${id}`)
  }

  addOne(body) {
    return this.request(this.path, {method: 'post', body: JSON.stringify(body)})
  }

  delOne(id) {
    return this.request(`${this.path}/${id}`, {method: 'delete'})
  }

  update({id, ...body}) {
    return this.request(`${this.path}/${id}`, {method: 'post', body: JSON.stringify(body)})
  }

}

export const md5Password = (username, password) => {
  return md5(username + md5(password))
}

export const loginManager = {
  query() {
    return request('/api/session')
  },
  login(username, password) {
    password = md5Password(username, password)
    return request('/api/session/login', {
      method: 'post',
      body: JSON.stringify({username, password}),
    })
  },
  logout() {
    return request('/api/session/logout', {
      method: 'post',
    })
  },
}
