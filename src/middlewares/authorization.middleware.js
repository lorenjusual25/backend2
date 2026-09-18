export function authorizeRoles (...allowedRoles) {
    return (req,res,next) => {
        if (!req.user) {
            return res.status(401).json({
                status: 'error',
                error: 'Unauthenticated',
                message: 'No autenticado'
            })
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'error',
                error: 'Unauthorized',
                message: 'No tenes permisos'
            })
        }
        next()
    }
}