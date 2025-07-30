## Proyecto Plataformas Abiertas: Tienda de Ropa

**Integrante:**  
- Eduardo Peraza

**Descripción:**  
Este proyecto crea una base de datos NoSQL (MongoDB) para una tienda de ropa, con colecciones de usuarios, marcas, prendas y ventas. Incluye operaciones CRUD y consultas avanzadas.

### Ejemplos de documentos

**Usuarios**
```json
{
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "supersegura123",
  "rol": "cliente",
  "fecha_creacion": "2025-06-25T00:00:00.000Z"
}
```

**Marcas**
```json
{
  "nombre": "Nike",
  "pais": "USA"
}
```

**Prendas**
```json
{
  "nombre": "Camiseta Deportiva",
  "marca": "63f8a3bf...", 
  "precio": 25,
  "cantidad_stock": 50
}
```

**Ventas**
```json
{
  "prenda": "63f8a3bf...",
  "fecha_venta": "2025-07-01T00:00:00.000Z",
  "cantidad": 3,
  "total": 75,
  "usuario": "63f8b4d2..."
}
```

**Cómo ejecutar**
1. Clona el repositorio.
2. Crear un archivo .env con la variable:

```json
MONGODB_URI="tu_uri_de_mongodb_atlas"
```

3. Instalar dependencias:

```json
npm install
```

4. Ejecutar el script de operaciones:
```json
node database/db-operations.js
```


