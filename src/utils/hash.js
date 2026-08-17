import bcrypt from 'bcrypt'
export async function createHash(password) {
    return await bcrypt.hash(password,10)
}
/*Para logica de logIn
export async function validatePassword(password,hashPassword) {
    return await bcrypt.compare(password,hashPassword)
}*/