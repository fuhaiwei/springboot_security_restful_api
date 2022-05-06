import { fetchResult } from '#H/UseResult'

export interface IUser {}

interface RegisterForm {
  username: string
  password: string
}

export function postRegister(form: RegisterForm) {
  return fetchResult<IUser>('/api/register', {
    method: 'POST',
    body: JSON.stringify(form),
    successText: 'Register Success',
    failureName: 'Register Failure',
  }).then((result) => result.data)
}
