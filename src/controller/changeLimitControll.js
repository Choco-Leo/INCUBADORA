// Variable para almacenar los límites actuales
let currentLimits = {
    temp_min: 0.0,
    temp_max: 100.5,
    hum_min: 0.0,
    hum_max: 100.0,
    Encubando: "Incubadora 1"
};

export const changeLimits = async (req, res) => {
    try {
        // Primero verificamos si es una petición GET_LIMITS del ESP32
        if (req.body.EventType === "GET_LIMITS") {
            return res.status(200).json(currentLimits);
        }

        // Si no es GET_LIMITS, entonces procesamos los nuevos límites
        const { temp_min, temp_max, hum_min, hum_max, Encubando } = req.body;

        // Validamos que todos los límites estén presentes
        if (!temp_min || !temp_max || !hum_min || !hum_max) {
            return res.status(400).json({
                message: "Todos los límites son requeridos (temp_min, temp_max, hum_min, hum_max)"
            });
        }

        // Actualizamos los límites en memoria
        currentLimits = {
            temp_min,
            temp_max,
            hum_min,
            hum_max,
            Encubando: Encubando || currentLimits.Encubando // Si no se proporciona, mantiene el valor actual
        };
        res.status(200).json(currentLimits);

    } catch (error) {
        res.status(500).json({
            message: "Error al procesar los límites",
            error: error.message
        });
    }
}