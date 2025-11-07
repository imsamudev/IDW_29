# Clínica IDW S.A 
<img width="430" height="430" alt="image" src="https://github.com/user-attachments/assets/c3577ff5-3e7e-4c48-80d8-cb7d127ccdf9" />

## Descripción

Este proyecto corresponde al trabajo práctico integrador de la materia *Introducción al Desarrollo Web, como parte de la **Tecnicatura Universitaria en Desarrollo Web de la UNER*.

El objetivo es desarrollar un sistema web completo para la gestión de turnos médicos de una clínica ficticia, implementando funcionalidades de reservas, administración de recursos y autenticación de usuarios.

## Características del proyecto

<img width="1024" height="941" alt="image" src="https://github.com/user-attachments/assets/0ea409ef-7715-4d7d-8895-933c29bbe025" />

### Páginas principales

- *Inicio (index.html):* Página principal con información institucional y acceso rápido a la reserva de turnos.
- *Institucional (institucional.html):* Historia, misión, visión y catálogo del equipo médico.
- *Contacto (contacto.html):* Formulario de contacto e información de la clínica.
- *Reservas (reservas.html):* Sistema de reserva de turnos con selección de especialidad, médico, obra social y cálculo automático de descuentos.
- *Login (login.html):* Acceso autenticado para administradores mediante API externa.
- *Panel de Administración (admin.html):* CRUD completo para médicos, especialidades, obras sociales, turnos y visualización de reservas y usuarios.

### Funcionalidades implementadas

#### Sistema de reservas

- Filtrado dinámico de médicos por especialidad
- Selección de turnos disponibles por médico
- Aplicación automática de descuentos según obra social
- Cálculo y visualización del precio final
- Confirmación de reserva con resumen detallado
- Validación de disponibilidad de turnos

#### Panel de administración

- *Gestión de médicos:* Agregar, editar, eliminar y visualizar profesionales con fotografías en formato Base64
- *Gestión de especialidades:* Administración de las especialidades médicas disponibles
- *Gestión de obras sociales:* Configuración de obras sociales con porcentajes de descuento
- *Gestión de turnos:* Creación y edición de turnos con validación de fechas futuras
- *Visualización de reservas:* Listado completo de las reservas realizadas
- *Visualización de usuarios:* Integración con API externa (DummyJSON) para mostrar usuarios del sistema

#### Autenticación y seguridad

- Login integrado con API REST de DummyJSON
- Validación de rol de administrador
- Protección de rutas administrativas mediante tokens de sesión
- Manejo de errores de autenticación

#### Características adicionales

- Modo oscuro/claro con persistencia en localStorage
- Diseño responsive adaptado a dispositivos móviles, tablets y desktop
- Generación dinámica de turnos con validación automática de fechas obsoletas
- Persistencia de datos mediante localStorage
- Interfaz intuitiva con feedback visual mediante alertas y mensajes

## Tecnologías utilizadas

- *HTML5:* Estructura semántica de las páginas
- *CSS3:* Estilos personalizados con variables CSS y animaciones
- *JavaScript (ES6+):* Lógica de negocio, manipulación del DOM e integración con APIs
- *Bootstrap 5.3:* Framework CSS para diseño responsive y componentes UI
- *LocalStorage API:* Persistencia de datos en el navegador
- *Fetch API:* Consumo de API REST externa
- *SessionStorage API:* Gestión de sesiones de usuario

## Estructura del proyecto


├── index.html              # Página principal
├── institucional.html      # Información institucional
├── contacto.html           # Formulario de contacto
├── reservas.html           # Sistema de reservas
├── login.html              # Autenticación de administradores
├── admin.html              # Panel de administración
├── styles.css              # Estilos globales y tema
├── scripts.js              # Funcionalidades generales y autenticación
├── reservas.js             # Lógica del sistema de reservas
├── institucional.js        # Renderizado del catálogo médico
├── admin.js                # Funcionalidades del panel de administración
├── datos-iniciales.js      # Datos de prueba e inicialización
├── assets/                 # Recursos estáticos (imágenes, favicon)
└── README.md               # Documentación del proyecto


## Instalación y uso

### Acceso en producción

El proyecto está desplegado y disponible en:
[https://imsamudev.github.io/IDW_29/](https://imsamudev.github.io/IDW_29/)

### Ejecución local

1. Clonar el repositorio:
bash
git clone https://github.com/imsamudev/IDW_29.git


2. Abrir el archivo index.html en un navegador web moderno.

*Nota:* Para evitar problemas con CORS al ejecutar localmente, se recomienda usar una extensión como Live Server en Visual Studio Code.

### Credenciales de acceso

Para acceder al panel de administración, utilizar las siguientes credenciales de prueba (provistas por DummyJSON):

- *Usuario:* emilys
- *Contraseña:* emilyspass

Otros usuarios válidos con rol de administrador pueden consultarse en la [documentación de DummyJSON](https://dummyjson.com/docs/users).

## Flujo de uso

### Para pacientes

1. Acceder a la sección *Reservas* desde el menú principal
2. Seleccionar especialidad médica
3. Elegir médico disponible
4. Seleccionar obra social (el descuento se aplica automáticamente)
5. Elegir turno disponible
6. Completar datos del paciente
7. Confirmar la reserva

### Para administradores

1. Acceder a *Login* mediante el ícono en la barra de navegación
2. Ingresar credenciales de administrador
3. En el panel de administración, seleccionar la pestaña deseada:
   - *Médicos:* Gestionar profesionales de la clínica
   - *Especialidades:* Administrar especialidades médicas
   - *Obras Sociales:* Configurar coberturas y descuentos
   - *Turnos:* Crear y gestionar horarios disponibles
   - *Reservas:* Visualizar reservas realizadas
   - *Usuarios:* Consultar usuarios del sistema

## Validaciones implementadas

- Turnos solo se pueden crear con fechas y horarios futuros
- No se pueden eliminar médicos con turnos asignados
- No se pueden eliminar especialidades con médicos asociados
- No se pueden eliminar obras sociales aceptadas por médicos
- No se pueden eliminar turnos con reservas confirmadas
- Validación de campos obligatorios en todos los formularios
- Validación de porcentajes de descuento (0-100%)
- Limpieza automática de turnos con fechas pasadas

## Persistencia de datos

El sistema utiliza localStorage para mantener la información entre sesiones:

- medicos: Listado de profesionales médicos
- especialidades: Especialidades médicas disponibles
- obrasSociales: Obras sociales y porcentajes de descuento
- turnos: Turnos disponibles y ocupados
- reservas: Reservas confirmadas
- theme: Preferencia de tema (claro/oscuro)

## Diseño responsive

El proyecto implementa un diseño adaptable mediante:

- Sistema de grillas de Bootstrap 5
- Media queries personalizadas
- Componentes colapsables en dispositivos móviles
- Tablas responsivas con scroll horizontal
- Botones de acción apilados en pantallas pequeñas

## Accesibilidad

- Navegación mediante teclado
- Etiquetas ARIA en componentes interactivos
- Contraste adecuado en modo claro y oscuro
- Descripciones alternativas en imágenes
- Estructura semántica HTML5

## Grupo 29

### Contribuciones

Este proyecto fue desarrollado colaborativamente por:

- *Samuel Figueroa* 
- *Alethia A. Gerez Medina* 
- *Fabricio R. Galíndez* 
- *Celeste Isabel Granillo* 

## Licencia

Este proyecto es parte de un trabajo académico de la Tecnicatura Universitaria en Desarrollo Web de la UNER.

---

*Universidad Nacional de Entre Ríos (UNER)*  
Introducción al Desarrollo Web - 2025
