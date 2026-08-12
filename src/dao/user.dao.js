import * as userModel from '../models/userModel.js'
export function addUser (data) {
    return userModel.addUser(data)
}
export function findAllUsers () {
    return userModel.findAllUsers()
}
export function findUserById (id) {
    return userModel.findUserById(id)
}
export function findUserByName (name) {
    return userModel.findUserByName(name)
}
export function deleteUserById (id) {
    return userModel.deleteUserById(id)
}