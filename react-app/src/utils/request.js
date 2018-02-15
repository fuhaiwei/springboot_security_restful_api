const header = 'X-CSRF-HEADER'
const token = 'X-CSRF-TOKEN'

function prepareCookies({credentials, ...props}) {
  if (!credentials) {
    credentials = 'include'
  }
  return {credentials, ...props}
}

function prepareHeader({method = 'get', headers = {}, ...prors}) {
  const name = sessionStorage[header]
  const value = sessionStorage[token]
  if (name && value) {
    headers[name] = value
  }
  headers['Content-Type'] = 'application/json;charset=UTF-8'
  return {method, headers, ...prors}
}

function checkStatus(response) {
  if (response.status < 200 || response.status > 300) {
    throw new Error(`Server Error: ${response.status}: ${response.statusText}`)
  }
  return response
}

function saveCsrfToken(response) {
  const headers = response.headers
  sessionStorage[header] = headers.get(header)
  sessionStorage[token] = headers.get(token)
  return response
}

function parseToJSON(response) {
  return response.json()
}

export default function request(url, props = {}) {
  props = prepareCookies(props)
  props = prepareHeader(props)
  return fetch(url, props)
    .then(checkStatus)
    .then(saveCsrfToken)
    .then(parseToJSON)
    .catch(err => {
      return {success: false, message: err.message}
    })
}
