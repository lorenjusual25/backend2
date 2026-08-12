import * as userDao from '../dao/user.dao.js'
export function addUser(data) {
    return userDao.addUser(data)
}
export function findAllUsers() {
    return userDao.findAllUsers()
}
export function findUserById (id) {
    return userDao.findUserById(id)
}
export function findUserByName(name) {
    return userDao.findUserByName(name)
}
export function deleteUserById(id) {
    return userDao.deleteUserById(id)
}