# Challenge de Laravel + vue

## Instrucciones
Desarrollar una aplicación sencilla de directorio telefónico.

La aplicación cumplirá los siguientes requisitos funcionales:
- Debe tener una pantalla de acceso (login) que identificará al usuario para tener acceso
a sus contactos.
También debe tener la opción de registrarse si es un nuevo usuario.
    - Una vez autenticado tendrá acceso a una pantalla desde la que:
    - Se mostrará un listado con todos los contactos y sus datos: nombre y teléfono
    - Podrá crear un nuevo contacto con sus datos
    - Podrá editar los datos de un contacto
    - Podrá eliminar un contacto

La aplicación cumplirá los siguientes requisitos técnicos:

- Desarrollar utilizando sólo Laravel 8.x y Vue.js (con API.Rest preferiblemente)
- Subir los fuentes de la aplicación a GitHub para poder evaluarla por nuestra parte

Criterios de evaluación:
- Limpieza y sencillez del código
- Que cumpla lo especificado
- No usar código o librerías innecesarias
- Correcto uso de Laravel: convenciones, migrations, etc.
- Tiempo en entregar la prueba

## Requisitos
Se ha creado una configuración DockerFile para el rápido despliegue de la aplicación. En dicho fichero se pueden inspeccionar los requisitos.

## Consideraciones
El ejercicio no indicaba qué métodos de autenticación, desacoplamiento o módulos built-in a usar, por lo que indico qué utilicé:
- Sanctum para la autenticación (módulo perteneciente al base laravel 8.x)
- Vue en SPA y comunicación íntegra mediante API rest.
- Axios como módulo básico de comunicación ajax en vue.
- Crud con modales (Comúnmente solicitado por UX).
- Pantalla de carga entre llamadas api.
- Recarga completa de datos tras modificación de los mismos (revalidación de acciones).
- Gestión de caducidad de sesión en backend.

## Despliegue
Para desplegar nuestro docker deberemos utilizar docker-compose up, si estamos fuera de la carpeta de docker deberemos anotar el fichero docker-compose con:
`docker-compose -f docker/docker-compose.yaml up`

Una vez desplegada la instancia accederemos a ella (para entrar de forma cómoda hay un fichero en docker/access.sh).

Instalaremos las dependencias básicas tanto de la parte back como de la parte front:

```shell
composer update
npm i
```

Generaremos los autoloads, recompilaremos y limpiaremos ficheros de caché:

```shell
cp .env.example .env
composer dumpauto
php artisan optimize
npm run prod
```

Después necesitaremos conectar con la base de datos (localhost:3306) y crearemos el esquema contacts
Podremos ahora visitar http://localhost:8080, registrarnos y hacer login, crear contactos, editarlos y borrarlos.

