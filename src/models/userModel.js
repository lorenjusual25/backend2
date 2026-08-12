const users = []
export function addUser (data) {
    const user = {
        id:users.length + 1,
        name:data.name,
        email:data.email
    }
    users.push(user)
    return user
}
export function findAllUsers () {
    return users
}
export function deleteUserById (id) {
    const i = users.findIndex(u => u.id === Number(id))
    if (i === -1) 
        return false
    users.splice(i,1)
    return true
}
export function findUserById (id) {
    return users.find(u => u.id === Number(id))
}
export function findUserByName (name) {
    return users.filter(u => u.name === name)
}