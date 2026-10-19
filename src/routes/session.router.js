import {Router} from 'express'
import {
    register,
    login,
    getCurrentUser,
    logout,
    githubCallback
} from '../controllers/session.controller.js'
import passport from 'passport'
const router = Router()
router.post('/logout',logout)
router.post('/register',passport.authenticate('register',{
    session:false
}),register)
router.post('/login',passport.authenticate('login',{
    session:false
}),login)
router.get('/current',passport.authenticate('current',{
    session:false
}),getCurrentUser)
router.get('/github',passport.authenticate('github',{
    scope:["user:email"]
}))
router.get('/github/callback',passport.authenticate('github',{
    session:false
}),githubCallback)
export default router