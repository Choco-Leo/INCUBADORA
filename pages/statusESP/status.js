document.getElementById('limitsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        temp_min: parseFloat(document.getElementById('temp_min').value),
        temp_max: parseFloat(document.getElementById('temp_max').value),
        hum_min: parseFloat(document.getElementById('hum_min').value),
        hum_max: parseFloat(document.getElementById('hum_max').value),
        Encubando: document.getElementById('Encubando').value
    };

    try {
        const response = await fetch('/ControlESP/ObtenerLimites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Límites actualizados correctamente');
        } else {
            alert('Error al actualizar los límites: ' + data.message);
        }
    } catch (error) {
        alert('Error al enviar los datos: ' + error.message);
    }
});

// Cargar límites actuales al cargar la página
window.addEventListener('load', async () => {
    try {
        const response = await fetch('/ControlESP/ObtenerLimites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ EventType: 'GET_LIMITS' })
        });

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('temp_min').value = data.temp_min;
            document.getElementById('temp_max').value = data.temp_max;
            document.getElementById('hum_min').value = data.hum_min;
            document.getElementById('hum_max').value = data.hum_max;
            document.getElementById('Encubando').value = data.Encubando;
            
            // Después de cargar los límites, iniciar la tabla
            loadErrorTable();
            setInterval(loadErrorTable, INTERVALO_ACTUALIZACION);
        }
    } catch (error) {
        console.error('Error al cargar los límites actuales:', error);
    }
});


// Función para formatear la fecha
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

// Función para formatear números con validación
const formatNumber = (value, unit) => {
    if (value === null || value === undefined) return '-';
    const numValue = parseFloat(value);
    return isNaN(numValue) ? '-' : numValue.toFixed(1) + unit;
};

// Función para cargar los datos de la tabla
const loadErrorTable = async () => {
    const tableBody = document.getElementById('errorTableBody');
    try {
        const response = await fetch('/ControlESP/TableError');
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        updateSystemStatus(data); // Agregamos esta línea para actualizar el estado

        tableBody.innerHTML = ''; // Limpiar tabla

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="9" class="text-center">No hay datos disponibles</td></tr>';
            return;
        }

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatDate(row.fecherror)}</td>
                <td>${row.encubando || '-'}</td>
                <td>${row.eventtype || '-'}</td>
                <td>${formatNumber(row.temp, '°C')}</td>
                <td>${formatNumber(row.hum, '%')}</td>
                <td>${formatNumber(row.temp_min, '°C')}</td>
                <td>${formatNumber(row.temp_max, '°C')}</td>
                <td>${formatNumber(row.hum_min, '%')}</td>
                <td>${formatNumber(row.hum_max, '%')}</td>
            `;
            tableBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar la tabla:', error);
        updateSystemStatus(null); // También actualizamos el estado en caso de error
    }
};

// Cargar la tabla al iniciar y cada 30 segundos
const INTERVALO_ACTUALIZACION = 30000; // 30 segundos en milisegundos

// Eliminar el window.addEventListener('load') ya que es redundante

document.addEventListener('DOMContentLoaded', async () => {
    // Primero cargar los límites
    try {
        const response = await fetch('/ControlESP/ObtenerLimites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ EventType: 'GET_LIMITS' })
        });

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('temp_min').value = data.temp_min;
            document.getElementById('temp_max').value = data.temp_max;
            document.getElementById('hum_min').value = data.hum_min;
            document.getElementById('hum_max').value = data.hum_max;
            document.getElementById('Encubando').value = data.Encubando;
            
            // Después de cargar los límites, iniciar la tabla
            loadErrorTable();
            setInterval(loadErrorTable, INTERVALO_ACTUALIZACION);
        }
    } catch (error) {
        console.error('Error al cargar los límites actuales:', error);
    }
});

// Función para actualizar el estado del sistema
const updateSystemStatus = async (data) => {
    const connectionStatus = document.getElementById('connectionStatus');
    const systemStatus = document.getElementById('systemStatus');
    
    let isConnected = false;
    let isConnecting = false;
    
    try {
        const response = await fetch('/ControlESP/VerConx', {
            method: 'POST',  // Cambiamos a POST ya que GET no está disponible
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ check: true })  // Agregamos un cuerpo a la petición
        });
        
        if (!response.ok) {
            isConnected = false;
            isConnecting = false;
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const conexData = await response.json();
        console.log('Estado de conexión recibido:', conexData.connectionState);
        
        if (conexData.connectionState === false) {
            isConnected = false;
            isConnecting = false;
        } else {
            isConnected = conexData.connectionState;
            isConnecting = conexData.connecting;
        }

    } catch (error) {
        console.error('Error de conexión:', error);
        isConnected = false;
        isConnecting = false;
    }

    // Actualizar indicador de conexión
    if (isConnecting) {
        connectionStatus.className = 'status-indicator connection-status bg-info';
        connectionStatus.textContent = 'Conectando...';
    } else {
        connectionStatus.className = `status-indicator connection-status ${isConnected ? 'bg-success' : 'bg-danger'}`;
        connectionStatus.textContent = isConnected ? 'Conectado' : 'Desconectado';
    }

    // Mostrar/ocultar y actualizar el estado del sistema
    systemStatus.style.display = isConnected ? 'block' : 'none';

    // Solo actualizar el estado del sistema si hay conexión y datos
    if (isConnected && data && data.length > 0) {
        const lastRecord = data[0];
        const currentLimits = {
            temp_min: parseFloat(document.getElementById('temp_min').value),
            temp_max: parseFloat(document.getElementById('temp_max').value),
            hum_min: parseFloat(document.getElementById('hum_min').value),
            hum_max: parseFloat(document.getElementById('hum_max').value)
        };

        if (lastRecord.temp === null || lastRecord.hum === null) {
            systemStatus.className = 'status-indicator system-status bg-warning';
            systemStatus.textContent = 'Error sensores';
            return;
        }

        const temp = parseFloat(lastRecord.temp);
        const hum = parseFloat(lastRecord.hum);
        const tempInRange = temp >= currentLimits.temp_min && temp <= currentLimits.temp_max;
        const humInRange = hum >= currentLimits.hum_min && hum <= currentLimits.hum_max;

        if (tempInRange && humInRange) {
            systemStatus.className = 'status-indicator system-status bg-success';
            systemStatus.textContent = 'Sistema OK';
        } else {
            systemStatus.className = 'status-indicator system-status bg-danger';
            systemStatus.textContent = 'Fuera de rango';
        }
    }
};