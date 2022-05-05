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

export function fetchResult<T>(input: RequestInfo, init?: RequestInit | undefined) {
  return fetch(input, init).then(handleResponse, (error) => {
    return Promise.reject(error.type)
  }) as Promise<Result<T>>
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    return Promise.reject({
      name: `HTTP ${response.status}`,
      message: response.statusText,
    })
  }
  try {
    const result: Result<any> = await response.json()
    if (!result.success) {
      return Promise.reject({ name: '请求失败', message: result.message })
    } else {
      return Promise.resolve(result)
    }
  } catch (error: any) {
    console.log(error)
    return Promise.reject({ name: 'JSON ERROR', message: error.message })
  }
}
