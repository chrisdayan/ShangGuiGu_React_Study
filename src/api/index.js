import ajax from './ajax';

const BASE = ''

// 登陆
// export function reqLogin(usename, password) {
//     Ajax('/login', { usename, password }, 'POST')
// }
// export const reqLogin = (usename, password) => { return Ajax('/login', { usename, password }, 'POST') }
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')