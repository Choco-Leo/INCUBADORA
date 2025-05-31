let connectionTimeout;
let currentConnectionState = false;

export const verifyConnection = async (req, res) => {
    try {
        const { isConnected } = req.body;
        
        if (isConnected) {
            currentConnectionState = true;
            
            // Limpia el temporizador anterior si existe
            if (connectionTimeout) {
                clearTimeout(connectionTimeout);
            }
            
            // Establece un nuevo temporizador
            connectionTimeout = setTimeout(() => {
                currentConnectionState = false;
                console.log('Conexión perdida - 15 segundos sin respuesta');
            }, 15000); // 15 segundos
        }
        console.log('es:', currentConnectionState);
        
        return res.status(200).json({
            connectionState: currentConnectionState
        });

    } catch (error) {
        console.error("Error al procesar la verificación de conexión:", error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};