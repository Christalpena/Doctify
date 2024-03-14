# Doctify

Doctify es una aplicación diseñada para simplificar y agilizar el proceso de documentación de tu API REST. Con Doctify, puedes generar documentación detallada y completa para tu API en cuestión de minutos.

## Características

- **Entrada Rápida**: Doctify ofrece cinco campos de entrada que te permiten ingresar los detalles de tu API de manera rápida y sencilla.
- **Generación Automática**: A partir de la URL GET y su respuesta de datos, Doctify genera automáticamente la información necesaria para los otros endpoints.
- **Eliminación de Campos No Necesarios**: Cuando ingresas una URL POST, puedes eliminar los campos que no necesites en la documentación.
- **Impresión y Copiado**: Doctify te permite imprimir la documentación o copiarla al portapapeles fácilmente para su distribución.

## Uso

1. **URL GET**: Ingresa la URL GET de tu API. Este es el único campo requerido.
2. **PATH**: Ingresa la ubicación del objeto de datos si no proporcionaste una URL GET directa al objeto de datos.
3. **URL POST**: Ingresa la URL POST de tu API si es necesario.
4. **URL PUT y DELETE**: Utiliza ":" para indicar parámetros dinámicos en las URLs, por ejemplo: `http://localhost:8000/api/v1/flowers/:id`.

Una vez que hayas ingresado los detalles de tu API, puedes imprimir la documentación o copiarla al portapapeles para su uso.

## Ejemplo

Supongamos que tenemos una API de ejemplo con las siguientes URLs:

- GET: `http://example.com/api/v1/users`
- POST: `http://example.com/api/v1/users`
- PUT: `http://example.com/api/v1/users/:id`
- DELETE: `http://example.com/api/v1/users/:id`

Para documentar esta API con Doctify, seguiríamos estos pasos:

1. Ingresamos la URL GET: `http://example.com/api/v1/users`
2. Opcionalmente, ingresamos la URL POST, PUT y DELETE con los parámetros dinámicos si es necesario.
3. Doctify generará automáticamente la documentación para cada endpoint basándose en la URL GET y su respuesta de datos.
