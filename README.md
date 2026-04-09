# 🛒 API de Productos y Carritos

## 📌 Descripción

API REST desarrollada con **Node.js, Express y MongoDB (Mongoose)** que permite gestionar productos y carritos de compra.

Incluye funcionalidades avanzadas como:

* Paginación
* Filtros
* Ordenamiento
* Indexación en base de datos
* Uso de referencias y populate

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* MongoDB
* Mongoose

---
## 🌐 Base de datos

El proyecto utiliza MongoDB Atlas como base de datos en la nube.  
La conexión se realiza mediante variables de entorno.

Para ejecutar el proyecto, crear un archivo `.env` con:

MONGO_URL=mongodb+srv://admin:admin@cluster0.zhfwe7z.mongodb.net/ecommerce
PORT=8080


## 📦 Endpoints

### 🔹 Productos

#### Obtener productos (con filtros, paginación y ordenamiento)

```http
GET /api/products
```

Query params:

* `limit` (opcional, default 10)
* `page` (opcional, default 1)
* `query` (categoría o disponibilidad)
* `sort` (asc / desc por precio)

Ejemplo:

```
/api/products?query=calzado&sort=asc&page=1&limit=5
```

---

#### Obtener producto por ID

```http
GET /api/products/:id
```

---

#### Crear producto

```http
POST /api/products
```

---

#### Actualizar producto

```http
PUT /api/products/:id
```

---

#### Eliminar producto

```http
DELETE /api/products/:id
```

---

### 🛒 Carritos

#### Crear carrito

```http
POST /api/carts
```

---

#### Obtener carrito (con populate)

```http
GET /api/carts/:cid
```

---

#### Agregar producto al carrito

```http
POST /api/carts/:cid/products/:pid
```

---

#### Eliminar producto del carrito

```http
DELETE /api/carts/:cid/products/:pid
```

---

#### Actualizar cantidad de un producto

```http
PUT /api/carts/:cid/products/:pid
```

Body:

```json
{
  "quantity": 5
}
```

---

#### Reemplazar productos del carrito

```http
PUT /api/carts/:cid
```

---

#### Vaciar carrito

```http
DELETE /api/carts/:cid
```

---

## 🧠 Conceptos implementados

* **Indexación**: Se aplicaron índices en campos como `category`, `price` y `stock` para mejorar el rendimiento de búsqueda.
* **Paginación**: Implementada mediante `limit` y `page`.
* **Filtros**: Búsqueda por categoría o disponibilidad.
* **Ordenamiento**: Ascendente o descendente por precio.
* **Populate**: Uso de referencias entre colecciones para obtener datos completos de productos en el carrito.
* **Arquitectura por capas**: Separación en routers y repositories.

---

## 📂 Estructura del proyecto

```
src/
├── models/
├── routes/
├── repositories/
├── config/
└── server.js
```



## 👨‍💻 Autor

* Ezequiel Bressan

## 👨‍💻 Profesor

* Mauricio Di Pietro

## 👨‍💻 Curso

* CoderHouse Fullstack - Programación Backend I: Desarrollo Avanzado de Backend
