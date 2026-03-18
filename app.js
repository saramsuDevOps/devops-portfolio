// ============================================
// app.js -  PROGRAMA PRINCIPAL
// ============================================

// EXPRESS = Librería que ayuda a crear servidores web fácilmente
// (Un servidor web es un programa que escucha peticiones de navegadores)
const express = require('express');

// OS = Librería del sistema operativo (para obtener info de la computadora)
const os = require('os');

// Crea la aplicación Express
const app = express();

// Puerto donde escuchará (process.env.PORT = variable de entorno, || 3000 = si no existe, usa 3000)
const PORT = process.env.PORT || 3000;

// ============================================
// RUTAS (páginas que responderá nuestra app)
// ============================================

// Ruta principal: Cuando visitan http://localhost:3000/
app.get('/', (req, res) => {
    // req = request (petición del visitante)
    // res = response (respuesta que enviamos)
    
    res.json({
        mensaje: '¡Hola! Bienvenidos y Bienvenidas a mi portafolio DevOps / Hi! Welcome to my DevOps portfolio', 
        autor: 'Sara Amaya Suárez, @saramsu_DevOps',
        fecha: new Date().toLocaleString(),
        entorno: process.env.NODE_ENV || 'desarrollo',
        version: '1.0.0',
        sistema: {
            plataforma: os.platform(),      // Windows, Linux, etc.
            arquitectura: os.arch(),        // x64, arm, etc.
            cpus: os.cpus().length,         // Número de procesadores
            memoriaLibre: Math.round(os.freemem() / 1024 / 1024) + ' MB',
            memoriaTotal: Math.round(os.totalmem() / 1024 / 1024) + ' MB'
        }
    });
});

// Ruta de salud: Para verificar que todo funciona (usada por monitoreo)
app.get('/health', (req, res) => {
    res.status(200).json({
        estado: 'OK',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()) + ' segundos',
        mensaje: 'El sistema está funcionando correctamente'
    });
});

// Ruta de información DevOps: Muestra que entiendes el stack
app.get('/devops-info', (req, res) => {
    res.json({
        pipeline: 'GitHub Actions',
        container: 'Docker',
        cloud: 'Oracle Cloud',
        iac: 'Terraform (próximamente)',
        monitoring: 'Prometheus + Grafana',
        cicd_status: 'Automatizado'
    });
});

// ============================================
// INICIAR EL SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║  🚀 SERVIDOR DEVOPS INICIADO / DEVOPS SERVER INITIATED     ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║  📍 URL: http://localhost:${PORT}      ║`);
    console.log('║  📊 Health: http://localhost:' + PORT + '/health  ║');
    console.log('║  ℹ️  Info: http://localhost:' + PORT + '/devops-info ║');
    console.log('╚════════════════════════════════════╝');
});