# Proyecto de Control de Incubadora con ESP32
Este proyecto implementa un sistema de monitoreo y control para incubadoras utilizando ESP32 como dispositivo de hardware y una aplicación web para la gestión de parámetros y visualización de datos.

## Descripción
El sistema permite monitorear y controlar los parámetros críticos de una incubadora (temperatura y humedad), establecer límites personalizados según el tipo de incubación, y registrar eventos importantes como alertas o cambios de estado.

## Estructura del Proyecto
```
P001-JS-Incubadora/
├── index.js                # Punto de entrada de la aplicación
├── .env                    # Variables de entorno (configuración de BD)
├── .gitignore              # Archivos ignorados por git
├── package.json            # Dependencias y scripts
├── src/                    # Código fuente del backend
│   ├── conf/               # Configuraciones
│   │   ├── dbConx.js       # Conexión a la base de datos
│   │   └── env.js          # Gestión de variables de entorno
│   ├── controller/         # Controladores
│   │   ├── authConx.js     # Verificación de conexión
│   │   ├── changeLimitControll.js  # Control de límites
│   │   ├── getTableErrorContoll.js # Obtención de registros de eventos
│   │   └── reportEventControll.js  # Registro de eventos
│   ├── models/             # Modelos de datos
│   │   ├── espRepository.js # Operaciones con la base de datos
│   │   └── migration.js    # Creación de tablas
│   └── routes/             # Rutas de la API
│       └── routes.js       # Definición de endpoints
└── pages/                  # Frontend
    └── statusESP/          # Interfaz de usuario
        ├── status.css      # Estilos
        ├── status.html     # Estructura HTML
        └── status.js       # Lógica de cliente
```
## Tecnologías Utilizadas
- Backend : Node.js, Express.js
- Base de Datos : PostgreSQL
- Frontend : HTML, CSS, JavaScript, Bootstrap 5
- Hardware : ESP32 (no incluido en este repositorio)

## Funcionalidades Principales
1. Monitoreo en tiempo real : Visualización de temperatura y humedad actual.
2. Configuración de límites : Establecer rangos seguros para temperatura y humedad.
3. Registro de eventos : Almacenamiento de alertas y cambios de estado en la base de datos.
4. Verificación de conexión : Monitoreo del estado de conexión del dispositivo ESP32.
5. Interfaz responsiva : Diseño adaptable a diferentes dispositivos.

## Endpoints de la API
- POST /ControlESP/ReportarEvento : Registra eventos del ESP32 en la base de datos.
- POST /ControlESP/ObtenerLimites : Obtiene o actualiza los límites de temperatura y humedad.
- POST /ControlESP/VerConx : Verifica el estado de conexión del ESP32.
- GET /ControlESP/TableError : Obtiene los últimos 20 eventos registrados.
- GET /ControlESP : Sirve la interfaz web de control.

## Base de Datos
El proyecto utiliza PostgreSQL con una tabla principal:

- EventsErrors : Almacena los eventos y alertas con campos para fecha, tipo de evento, valores de temperatura y humedad, y límites configurados.

## Instalación y Configuración
### Requisitos Previos
- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)

### Pasos de Instalación
1. Instalar dependencias:
   
   ```
   npm install
   ```
2. Configurar variables de entorno:
   
   - Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
   ```
   PORT=3000
   PGUSER='tu_usuario_postgres'
   PGPASSWORD='tu_contraseña_postgres'
   PGHOST='localhost'
   PGPORT=5432
   PGDATABASE='P001-JS-INCUBADORA'
   ```
3. Ejecutar las migraciones:
   
   ```
   npm run migrate
   ```
4. Iniciar la aplicación:
   
   ```
   npm run dev
   ```
5. Acceder a la interfaz web:
   
   - Abrir en el navegador: http://localhost:3000/ControlESP


## Desarrollo
- Modo desarrollo : npm run dev (con recarga automática)
- Modo producción : npm start

## Configuración del ESP32
El dispositivo ESP32 debe estar programado para comunicarse con los siguientes endpoints:

- Enviar datos: POST /ControlESP/ReportarEvento
- Obtener límites: POST /ControlESP/ObtenerLimites
- Verificar conexión: POST /ControlESP/VerConx
El formato de datos esperado es JSON con los campos correspondientes a temperatura, humedad y tipo de evento.

## Licencia
ISC

## Autor
Hector Leonardo Martinez Rios