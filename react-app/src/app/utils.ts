import md5 from 'md5'

export function encodePassword(username: string, password: string) {
  return md5(md5(username + '<salt-1>') + md5(password + '<salt-2>') + '<salt-3>')
}
