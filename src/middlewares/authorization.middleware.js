import { findEventById } from "../repositories/event.repository.js"
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
export const authEventOwnerOrAdmin = async (req,res,next) => {
  try {
    const {id} = req.params
    const event = await findEventById(id)
    if (!event) {
        return res.status(404).json({
            status:"error",
            error:"EVENT_NOT_FOUND",
            message:"evento no encontrado"})
    }
    const isAdmin = req.user.role === "admin"
    const isOwner = event.organizer.toString() === req.user.id
    if (!isAdmin && !isOwner) {
        return res.status(403).json({
            status: 'error',
            error: 'Unauthorized',
            message: 'No tenes permisos'
        })
    }
    req.event = event
    next()
  } catch(error) {
    return res.status(500).json({status:"error",message:"Internal server error"})
  }
}