# 📝 NotasApp - Aplicación de Gestión de Notas

Aplicación web desarrollada en **Svelte** con **Firebase** para gestionar notas personales con autenticación de usuarios.

## 🚀 Características

- ✅ **Autenticación de usuarios** (Registro e Inicio de sesión)
- ✅ **CRUD completo** de notas (Crear, Leer, Actualizar, Eliminar)
- ✅ **Tiempo real** - Las notas se actualizan automáticamente
- ✅ **Notas privadas** - Cada usuario solo ve sus propias notas
- ✅ **Interfaz moderna** con diseño responsive
- ✅ **Validación de formularios** con mensajes de error claros

## 📋 Estructura del Proyecto

```
src/
├── lib/
│   ├── components/
│   │   ├── Login.svelte          # Componente de inicio de sesión
│   │   ├── Register.svelte       # Componente de registro
│   │   ├── Dashboard.svelte      # Panel principal con gestión de notas
│   │   ├── NoteForm.svelte       # Formulario reutilizable para crear/editar notas
│   │   └── NoteItem.svelte       # Componente para mostrar cada nota
│   ├── firebase.js               # Configuración de Firebase
│   └── index.js                  # Exportaciones de componentes
└── routes/
    ├── +layout.svelte            # Layout global
    └── +page.svelte              # Página principal con navegación
```

## 🛠️ Tecnologías Utilizadas

- **Svelte 5** - Framework JavaScript reactivo
- **SvelteKit** - Framework de aplicaciones web para Svelte
- **Firebase Authentication** - Autenticación de usuarios
- **Firebase Firestore** - Base de datos en tiempo real
- **Vite** - Herramienta de construcción rápida

## 📦 Instalación

1. Clona el repositorio o descarga los archivos

2. Instala las dependencias:
```bash
npm install
```

3. Asegúrate de que tu archivo `src/lib/firebase.js` esté configurado con tus credenciales de Firebase

4. En Firebase Console, habilita:
   - **Authentication** → Email/Password
   - **Firestore Database** → Crear base de datos
   - **Firestore Rules** → Agregar las reglas de seguridad (ver abajo)

## 🔥 Configuración de Firebase

### Reglas de Firestore

En Firebase Console → Firestore Database → Rules, agrega estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas para la colección de notas
    match /notes/{noteId} {
      // Permitir lectura solo si el usuario está autenticado 
      // y es el dueño de la nota
      allow read: if request.auth != null 
                  && resource.data.userId == request.auth.uid;
      
      // Permitir crear solo si el usuario está autenticado
      // y el userId coincide con el usuario autenticado
      allow create: if request.auth != null 
                    && request.resource.data.userId == request.auth.uid;
      
      // Permitir actualizar solo si el usuario está autenticado
      // y es el dueño de la nota
      allow update: if request.auth != null 
                    && resource.data.userId == request.auth.uid;
      
      // Permitir eliminar solo si el usuario está autenticado
      // y es el dueño de la nota
      allow delete: if request.auth != null 
                    && resource.data.userId == request.auth.uid;
    }
  }
}
```

## 🚀 Ejecutar el Proyecto

### Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Compilar para Producción

```bash
npm run build
```

### Vista Previa de Producción

```bash
npm run preview
```

## 📱 Uso de la Aplicación

### 1. Registro de Usuario
- En la pantalla inicial, haz clic en "Regístrate aquí"
- Completa el formulario con:
  - Correo electrónico válido
  - Contraseña (mínimo 6 caracteres)
  - Confirmación de contraseña
- Haz clic en "Crear Cuenta"

### 2. Inicio de Sesión
- Ingresa tu correo y contraseña
- Haz clic en "Iniciar Sesión"
- Serás redirigido automáticamente al Dashboard

### 3. Crear Notas
- En el Dashboard, usa el formulario "Nueva Nota"
- Completa el título y contenido
- Haz clic en "Guardar Nota"

### 4. Editar Notas
- Haz clic en el botón "Editar" de cualquier nota
- Modifica el título o contenido
- Haz clic en "Actualizar" para guardar los cambios
- O en "Cancelar" para descartar los cambios

### 5. Eliminar Notas
- Haz clic en el botón "Eliminar" de la nota
- Confirma la eliminación en el diálogo

### 6. Cerrar Sesión
- Haz clic en "Cerrar Sesión" en la esquina superior derecha

## 🎨 Componentes

### Login.svelte
- Formulario de inicio de sesión
- Validación de campos
- Manejo de errores de autenticación
- Enlace para cambiar a registro

### Register.svelte
- Formulario de registro
- Validación de contraseña y confirmación
- Manejo de errores (correo duplicado, etc.)
- Enlace para cambiar a login

### Dashboard.svelte
- Vista principal de la aplicación
- Gestiona el estado de las notas
- Escucha cambios en tiempo real de Firestore
- Coordina NoteForm y NoteItem
- Botón de cerrar sesión

### NoteForm.svelte
- Formulario reutilizable
- Modo creación y edición
- Validación de campos
- Emite eventos `save`, `update` y `cancel`

### NoteItem.svelte
- Muestra una nota individual
- Botones para editar y eliminar
- Formato de fecha de creación
- Diseño con hover effect

## 🔒 Seguridad

- Las contraseñas son manejadas por Firebase Authentication (encriptadas)
- Cada usuario solo puede ver y editar sus propias notas
- Las reglas de Firestore protegen los datos a nivel de base de datos
- Validación en el cliente y el servidor

## 📊 Estructura de Datos en Firestore

### Colección: `notes`

```javascript
{
  id: "auto-generado-por-firestore",
  title: "Título de la nota",
  content: "Contenido de la nota",
  userId: "uid-del-usuario-autenticado",
  createdAt: Timestamp,
  updatedAt: Timestamp (opcional)
}
```

## ✅ Cumplimiento de Requisitos

### 1. Configuración del Proyecto (10 puntos)
- ✅ Proyecto Svelte creado
- ✅ Firebase configurado en `firebase.js`
- ✅ Authentication y Firestore habilitados

### 2. Autenticación (25 puntos)
- ✅ Componente `Login.svelte` con validación
- ✅ Componente `Register.svelte` con validación
- ✅ Llamadas a Firebase para autenticación
- ✅ Mensajes de error personalizados
- ✅ Redirección automática al Dashboard

### 3. Dashboard (30 puntos)
- ✅ Acceso solo para usuarios autenticados
- ✅ Formulario para crear notas
- ✅ Guardado en Firestore con UID del usuario
- ✅ Lista de notas en tiempo real
- ✅ Botón editar con actualización
- ✅ Botón eliminar con confirmación

### 4. Componentización (25 puntos)
- ✅ `NoteItem.svelte` muestra nota con botones
- ✅ `NoteForm.svelte` reutilizable para crear/editar
- ✅ `Dashboard.svelte` coordina la lógica
- ✅ Comunicación mediante eventos personalizados

### 5. Cierre de Sesión y Estilos (10 puntos)
- ✅ Botón "Cerrar sesión" en Dashboard
- ✅ Estilos modernos y responsivos
- ✅ Diseño limpio y organizado
- ✅ Gradientes y efectos visuales

## 🎯 Puntos Extra Implementados

- 🎨 **Diseño moderno** con gradientes y animaciones
- 📱 **Responsive design** adaptado a móviles
- ⚡ **Tiempo real** con onSnapshot de Firestore
- 🔔 **Confirmaciones** antes de eliminar
- ⏰ **Timestamps** con fecha de creación
- 🎭 **Iconos SVG** para mejor UX
- 🔄 **Loading states** durante operaciones

## 🐛 Solución de Problemas

### Error: "Firebase not initialized"
- Verifica que las credenciales en `firebase.js` sean correctas
- Asegúrate de haber habilitado Authentication y Firestore en Firebase Console

### Las notas no aparecen
- Revisa las reglas de Firestore
- Verifica que el usuario esté autenticado
- Abre la consola del navegador para ver errores

### Error al crear/editar notas
- Verifica que los campos no estén vacíos
- Revisa que las reglas de Firestore permitan escritura

## 📝 Notas de Desarrollo

- La aplicación usa Svelte 5 con la nueva sintaxis de runes (`$props`, `$derived`, etc.)
- Los componentes usan `createEventDispatcher` para comunicación padre-hijo
- El estado de autenticación se maneja con `onAuthStateChanged` de Firebase
- Las notas se ordenan por fecha de creación (más recientes primero)

## 👨‍💻 Autor

Desarrollado para la práctica de Svelte + Firebase

---

¡Disfruta gestionando tus notas! 📝✨
