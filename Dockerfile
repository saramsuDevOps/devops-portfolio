# ============================================
# Dockerfile - RECETA PARA CREAR LA CAJA
# ============================================

# PASO 1: Imagen base
# Alpine = Versión pequeña de Linux (solo 5MB)
# node:18-alpine = Alpine con Node.js versión 18 preinstalado
FROM node:18-alpine

# PASO 2: Crear carpeta de trabajo dentro de la caja
# /app es como "C:\MisDocumentos" pero dentro del contenedor
WORKDIR /app

# PASO 3: Copiar PRIMERO solo los archivos de configuración
# ¿Por qué? Porque si cambia solo el código, no reinstalamos todo
COPY package*.json ./

# PASO 4: Instalar dependencias dentro de la caja
# npm ci = "clean install", más rápido y seguro que npm install
# --only=production = No instala herramientas de desarrollo (más liviano)
RUN npm ci --only=production

# PASO 5: Copiar el código fuente
COPY app.js ./

# PASO 6: Informar qué puerto usará la aplicación
# Esto es documentación, no abre el puerto realmente
EXPOSE 3000

# PASO 7: Verificación de salud
# Cada 30 segundos, Docker revisa si la app responde en /health
# Si falla 3 veces seguidas, Docker reinicia el contenedor automáticamente
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# PASO 8: Comando para iniciar la aplicación
# Se ejecuta cuando alguien corre: docker run
CMD ["node", "app.js"]