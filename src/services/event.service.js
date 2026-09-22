import mongoose from 'mongoose'
const statusValidos = ["draft","published","cancelled","finished"]
function businessError (message,status = 400) {
    const error = new Error(message)
    error.status = status
    return error
}
function validateFields (data) {
    const requiredFields = [
        "title",
        "description",
        "category",
        "date",
        "location",
        "capacity",
        "price"
    ]
    const missingField = requiredFields.find((field) => {
        return (data[field] === undefined || data[field] === null || data[field] === "")
    })
    if (missingField) {
        throw businessError(`El campo ${missingField} es obligatorio`)
    }
}
function validateCapacityAndPrice (capacity,price) {
    if (capacity !== undefined && Number(capacity) <= 0) {
        throw businessError("La capacidad debe ser mayor que 0");
    }
    if (price !== undefined && Number(price) < 0) {
        throw businessError("El precio no puede ser negativo");
    }
}
function validateStatus (status) {
    if (status !== undefined && !statusValidos.includes(status)) {
        throw businessError("Status inválido")
    }
}
function validateDate(date, mustBeFuture =false) {
    const eventDate = new Date(date)
    if (Number.isNaN(eventDate.getTime())) {
        throw businessError("La fecha del evento no es válida")
    }
    if (mustBeFuture && eventDate <= new Date()) {
        throw businessError("No se puede crear un evento con fecha pasada")
    }
}
function validateEvent (data) {
    validateFields(data)
    validateCapacityAndPrice(data.capacity,data.price)
    validateStatus(data.status)
    validateDate(data.date,true)
}
export function createEventService (eventRepository) {
    return {
        async createEvent(event,user) {
            validateEvent(event)
            return eventRepository.createEvent({
                ...event,
                organizer:user?._id ?? user?.id
            })
        },
        async findEventById(id) {
            if (!mongoose.isValidObjectId(id)) {
                throw businessError("El ID del evento no es valido",400)
            }
            const event = await eventRepository.findEventById(id)
            if (!event) {
                throw businessError("Este evento no existe",404)
            }
            return event
        },
        async findAllEvents(query) {
            const {
                status,
                category,
                location,
                dateFrom,
                dateTo,
                page = 1,
                limit = 10,
                sort = "date"
            } = query
            validateStatus(status)
            const currentPage = Math.max(Number(page) || 1, 1)
            const currentLimit = Math.min(Math.max(Number(limit) || 10, 1), 100)
            const filter = {}
            if (status) {
                filter.status = status
            }
            if (category) {
                filter.category = { $regex: category, $options: "i" }
            }
            if (location) {
                filter.location = { $regex: location, $options: "i" }
            }
            if (dateFrom || dateTo) {
                filter.date = {};
                if (dateFrom) {
                    const from = new Date(dateFrom);
                    if (Number.isNaN(from.getTime())) {
                        throw businessError("dateFrom no es una fecha válida");
                    }
                    filter.date.$gte = from;
                }
                if (dateTo) {
                    const to = new Date(dateTo);
                    if (Number.isNaN(to.getTime())) {
                        throw businessError("dateTo no es una fecha válida");
                    }
                    filter.date.$lte = to;
                }
            }
            const allowedSortFields = ["date", "price", "title", "category", "location"];
            const sortField = sort.startsWith("-") ? sort.slice(1) : sort;
            if (!allowedSortFields.includes(sortField)) {
                throw businessError(`Campo de ordenamiento inválido. Permitidos: ${allowedSortFields.join(", ")}`);
            }
            const sortObject = {[sortField]: sort.startsWith("-") ? -1 : 1}
            const skip = (currentPage - 1) * currentLimit;
            const [data, total] = await Promise.all([
                eventRepository.findAllEvents(filter, {
                    skip,
                    limit: currentLimit,
                    sort: sortObject
                }),
                eventRepository.count(filter)
            ])
            return {
                data,
                page: currentPage,
                limit: currentLimit,
                total,
                totalPages: Math.ceil(total / currentLimit)
            }
        },
        async assertCanManage(event, user) {
            const isAdmin = user.role === "admin"
            if (isAdmin) {
                return
            }
            const isOwner = event.organizer?._id? event.organizer._id.toString() === user._id.toString(): event.organizer.toString() === user._id.toString()
            if (!isOwner) {
                throw businessError("No tenés permisos para modificar este evento",403)
            }
        },
        async updateEvent(id,eventData,user) {
            const event = await this.findEventById(id)
            if (!event) {
                throw businessError("Evento no existe",404)
            }
            if (event.status === "cancelled") {
                throw businessError("Un evento cancelado no puede modificarse")
            }
            await this.assertCanManage(event, user);
            const allowedFields = [
                "title",
                "description",
                "category",
                "date",
                "location",
                "capacity",
                "price"
            ]
            const updateData = {}
            for (const field of allowedFields) {
                if (eventData[field] !== undefined) {
                    updateData[field] = eventData[field]
                }
            }
            if (updateData.date !== undefined) {
                const newDate = new Date(updateData.date)
                if (Number.isNaN(newDate.getTime())) {
                    throw businessError("La fecha no es válida")
                }
                if (newDate <= new Date()) {
                    throw businessError("La fecha del evento no puede estar en el pasado")
                }
                updateData.date = newDate
            }
            validateCapacityAndPrice(updateData.capacity,updateData.price)
            if (Object.keys(updateData).length === 0) {
                throw businessError("No hay campos válidos para actualizar")
            }
            return eventRepository.updateEvent(id, updateData)
        },
        async changeStatus (id,status,user) {
            const event = await this.findEventById(id)
            if (event.status === "cancelled") {
                throw businessError("Evento cancelado no es modificable")
            }
            await this.assertCanManage(event,user)
            validateStatus(status)
            if (event.status === status) {
                throw businessError(`El evento ya tiene status "${status}"`)
            }
            if (status === "published" && event.status === "finished") {
                throw businessError("No se puede publicar un evento finalizado")
            }
            return eventRepository.updateEvent(id,{status})
        }
    }
}