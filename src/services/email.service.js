import { transporter } from '../config/mailer.config.js'
export class EmailService {
  async sendTicketConfirmation(user, event, ticket) {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      return
    }
    const subject = `Confirmación de inscripción - ${event.title}`
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.MAIL_USER,
      to: user.email,
      subject: `Confirmación de inscripción - ${event.title}`,
      html: `
        <h2>Inscripción confirmada</h2>
        <p>Hola ${user.first_name || user.email},</p>
        <p>Tu inscripción al evento <strong>${event.title}</strong> fue confirmada.</p>
        <p>Código de reserva: <strong>${ticket.reservationCode}</strong></p>
        <p>Fecha: ${new Date(event.date).toLocaleString()}</p>
        <p>Ubicación: ${event.location}</p>
      `
    })
  }
  async sendTicketCancellation(user, event, ticket) {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
        return
    }
    await transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.MAIL_USER,
        to: user.email,
        subject: `Cancelación de inscripción - ${event.title}`,
        html: `
            <h2>Inscripción cancelada</h2>
            <p>Hola ${user.first_name || user.email},</p>
            <p>
                Tu inscripción al evento
                <strong>${event.title}</strong>
                fue cancelada.
            </p>
            <p>
                Código de reserva:
                <strong>${ticket.reservationCode}</strong>
            </p>
        `
    })
  }
}
export default new EmailService()