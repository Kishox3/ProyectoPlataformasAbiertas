# Proyecto Plataformas Abiertas: Tienda de Ropa

---

## Descripción

Este proyecto implementa una **base de datos NoSQL (MongoDB)** y una **API RESTful** para la gestión de una tienda de ropa. El sistema está organizado en colecciones para **usuarios**, **marcas**, **prendas** y **ventas**, permitiendo operaciones CRUD completas y reportes avanzados para la administración eficiente de los datos.

### Integrante
- **Eduardo Peraza**

---

## Ejemplos de Documentos

A continuación se muestran ejemplos de la estructura de cada colección en la base de datos:

### Usuarios

```json
{
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "supersegura123",
  "rol": "cliente",
  "fecha_creacion": "2025-06-25T00:00:00.000Z"
}
```

### Marcas

```json
{
  "nombre": "Nike",
  "pais": "USA"
}
```

### Prendas

```json
{
  "nombre": "Camiseta Deportiva",
  "marca": "63f8a3bf...", // ID de la marca (ObjectId)
  "precio": 25,
  "cantidad_stock": 50
}
```

### Ventas

```json
{
  "prenda": "63f8a3bf...",   // ID de la prenda (ObjectId)
  "fecha_venta": "2025-07-01T00:00:00.000Z",
  "cantidad": 3,
  "total": 75,
  "usuario": "63f8b4d2..."  // ID del usuario (ObjectId)
}
```

---

## Cómo Ejecutar el Proyecto

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. **Clona el repositorio**  
   Descarga el código fuente a tu máquina local:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```

2. **Configura las variables de entorno**  
   Crea un archivo `.env` en la raíz del proyecto y añade tu URI de conexión a MongoDB Atlas:
   ```
   MONGODB_URI="tu_uri_de_mongodb_atlas"
   ```

3. **Instala las dependencias**  
   Ejecuta en la terminal:
   ```bash
   npm install
   ```

4. **Ejecuta el script de operaciones de base de datos**  
   Para interactuar directamente con la base de datos y probar las operaciones CRUD y reportes:
   ```bash
   node database/db-operations.js
   ```

5. **Inicia la API RESTful**  
   Para levantar el servidor y exponer los endpoints:
   ```bash
   node API/run.js
   ```

---

## API RESTful

La API RESTful permite interactuar con todas las colecciones y reportes de la tienda.  
**Base URL:** `http://localhost:5000/tienda/api/v1`

### Endpoints por Colección

#### Usuarios

| Método | Endpoint                | Descripción                                 | Body/Parámetros Ejemplo |
|--------|-------------------------|---------------------------------------------|-------------------------|
| GET    | `/usuarios`             | Obtiene todos los usuarios                  | —                       |
| GET    | `/usuarios/{id}`        | Obtiene un usuario por su ID                | —                       |
| POST   | `/usuarios`             | Crea uno o varios usuarios                  | Ver ejemplo abajo       |
| PUT    | `/usuarios/{id}`        | Actualiza un usuario por su ID              | Campos a modificar      |
| DELETE | `/usuarios/{id}`        | Elimina un usuario por su ID                | —                       |

**Ejemplo de body para POST (uno o varios):**
```json
[
  {
    "username": "juan",
    "email": "juan@ej.com",
    "password": "123",
    "rol": "cliente"
  },
  {
    "username": "ana",
    "email": "ana@ej.com",
    "password": "456",
    "rol": "admin"
  }
]
```

#### Marcas

Reemplaza `/usuarios` por `/marcas` en los endpoints.  
**Ejemplo de body para POST:**
```json
[
  { "nombre": "Nike", "pais": "USA" },
  { "nombre": "Adidas", "pais": "Alemania" }
]
```

#### Prendas

Reemplaza `/usuarios` por `/prendas`.  
**Ejemplo de body para POST:**
```json
[
  { "nombre": "Camiseta", "marca": "ID_MARCA", "precio": 25, "cantidad_stock": 100 }
]
```
> **Nota:** Usa el ObjectId real de la marca.

#### Ventas

Reemplaza `/usuarios` por `/ventas`.  
**Ejemplo de body para POST:**
```json
[
  {
    "prenda": "ID_PRENDA",
    "fecha_venta": "2025-07-01T00:00:00.000Z",
    "cantidad": 2,
    "total": 50,
    "usuario": "ID_USUARIO"
  }
]
```
> **Nota:** Usa los ObjectId reales de prenda y usuario.

---

### Endpoints de Reportes

| Método | Endpoint                              | Descripción                                                                 |
|--------|---------------------------------------|-----------------------------------------------------------------------------|
| GET    | `/reportes/marcas-con-ventas`         | Lista las marcas que tienen al menos una venta                              |
| GET    | `/reportes/prendas-stock`             | Muestra cada prenda vendida y su stock restante                             |
| GET    | `/reportes/top5-marcas`               | Devuelve las 5 marcas más vendidas y la cantidad de ventas                  |
| GET    | `/reportes/ventas-por-fecha?fecha=YYYY-MM-DD` | Devuelve la cantidad vendida de prendas en una fecha específica     |

**Ejemplo de uso:**  
`GET http://localhost:5000/tienda/api/v1/reportes/ventas-por-fecha?fecha=2025-07-01`

---

## Demostración con Postman

Para facilitar la prueba de la API, se incluye una colección de Postman:

1. **Importa la colección**  
   - Abre Postman y selecciona "Import".
   - Elige el archivo `API/postman-collection.json` incluido en este repositorio.

2. **Prueba todos los endpoints**  
   - La colección contiene ejemplos de cada endpoint CRUD y de reportes.
   - Puedes modificar los cuerpos de las peticiones para probar inserciones masivas o individuales.

---

## Organización del Repositorio

- `/database/`  
  Código y scripts para la gestión directa de la base de datos (operaciones CRUD y reportes).
- `/API/`  
  Código fuente de la API RESTful (modelos, controladores, rutas y colección de Postman).
- `README.md`  
  Documentación completa del proyecto, ejemplos y guía de uso.

---

## Requisitos y Cumplimiento

- [x] Estructura de repositorio clara y organizada
- [x] CRUD completo para todas las colecciones
- [x] Consultas avanzadas y reportes implementados
- [x] Documentación detallada y ejemplos en Markdown
- [x] Colección de Postman incluida para pruebas
- [x] Profesor agregado como colaborador en GitHub

---

## Contacto

Para dudas o sugerencias, contacta a **Eduardo Peraza**.

---