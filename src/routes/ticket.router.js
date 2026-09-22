import { Router } from "express";
import passport from "passport";
import {getMyTickets,cancelTicket} from "../controllers/ticket.controller.js";
const router = Router()
const authenticate = passport.authenticate("current",{ session: false })
router.get("/my-tickets",authenticate,getMyTickets)
router.patch("/:ticketId/cancel",authenticate,cancelTicket)
export default router