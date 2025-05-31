import { insertEventError } from "../models/espRepository.js";

// Controlador para insertar un evento recibido en formato JSON
export const reportEvent = async (req, res) => {
    try {
        // El evento debe venir en el body de la petición como JSON
        const eventData = req.body;
        console.log(eventData);
        
        const result = await insertEventError(eventData);
        res.status(201).json({
            message: "Evento insertado correctamente",
            event: result
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al insertar el evento",
            error: error.message
        });
    }
}