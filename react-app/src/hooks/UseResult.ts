import { message, Modal } from 'antd'

export interface Result<Data> {
  success: boolean
  message?: string
  data?: Data
  page?: Page
}

export interface Page {
  pageSize: number
  currentPage: number
  totalElements: number
}

interface Props {
  successText?: string
  failureText?: string
  failureName?: string
}

export function fetchResult<T>(input: RequestInfo, init: RequestInit & Props = {}) {
  const headers = new Headers(init.headers)
  loadCsrfToken(headers)
  setContentType(headers, init.body != null)
  setCredentials(init)
  init.headers = headers
  return fetch(input, init)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject({
          name: `HTTP ${response.status}`,
          message: response.statusText,
        })
      }
      saveCsrfToken(response.headers)
      saveSessionToken(response.headers)
      return response.json().then(
        (result: Result<T>) => {
          if (!result.success) {
            return Promise.reject({ name: 'Request Failed', message: result.message })
          } else {
            if (init.successText) {
              message.success(init.successText)
            }
            return Promise.resolve(result)
          }
        },
        (error) => {
          return Promise.reject({ name: 'Json Parse Error', message: error.message })
        }
      )
    })
    .catch((error) => {
      if (init.failureName) {
        if (error.name === 'Request Failed') {
          error.name = init.failureName
        }
        Modal.error({ title: error.name, content: error.message })
      } else if (init.failureText) {
        message.error(init.failureText)
      }
      return Promise.reject(error)
    })
}

function setCredentials(init: RequestInit) {
  init.credentials = init.credentials ?? 'same-origin'
}

function setContentType(headers: Headers, bodyExists: boolean) {
  if (!headers.has('Content-Type') && bodyExists) {
    headers.append('Content-Type', 'application/json')
  }
}

function loadCsrfToken(headers: Headers) {
  const header_name = sessionStorage['csrf_header_name']
  const token_value = sessionStorage['csrf_token_value']
  if (header_name && token_value && !headers.has(header_name)) {
    headers.append(header_name, token_value)
  }
}

function saveCsrfToken(headers: Headers) {
  if (headers.has('X-CSRF-HEADER')) {
    sessionStorage['csrf_header_name'] = headers.get('X-CSRF-HEADER')
  }
  if (headers.has('X-CSRF-TOKEN')) {
    sessionStorage['csrf_token_value'] = headers.get('X-CSRF-TOKEN')
  }
}
function saveSessionToken(headers: Headers) {
  if (headers.has('session-token')) {
    localStorage['session-token'] = headers.get('session-token')
  }
}
