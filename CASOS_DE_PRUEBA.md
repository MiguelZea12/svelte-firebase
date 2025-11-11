# 🧪 Casos de Prueba para NotasApp

## 📋 Lista de Verificación de Funcionalidades

### 1. Autenticación - Registro (25 puntos)

#### ✅ Caso 1.1: Registro exitoso
**Pasos:**
1. Abre la aplicación en http://localhost:5173
2. Haz clic en "Regístrate aquí"
3. Ingresa:
   - Email: `test@ejemplo.com`
   - Contraseña: `password123`
   - Confirmar: `password123`
4. Haz clic en "Crear Cuenta"

**Resultado esperado:**
- Usuario creado exitosamente
- Redirección automática al Dashboard
- Ver mensaje de bienvenida con el email

#### ❌ Caso 1.2: Registro con contraseñas que no coinciden
**Pasos:**
1. Ir a registro
2. Ingresa:
   - Email: `test2@ejemplo.com`
   - Contraseña: `password123`
   - Confirmar: `password456`
3. Haz clic en "Crear Cuenta"

**Resultado esperado:**
- Mensaje de error: "Las contraseñas no coinciden"
- No se crea el usuario

#### ❌ Caso 1.3: Registro con email duplicado
**Pasos:**
1. Ir a registro
2. Usar el mismo email que ya registraste
3. Haz clic en "Crear Cuenta"

**Resultado esperado:**
- Mensaje de error: "Este correo ya está registrado"

#### ❌ Caso 1.4: Registro con contraseña corta
**Pasos:**
1. Ir a registro
2. Ingresa:
   - Email: `test3@ejemplo.com`
   - Contraseña: `12345` (solo 5 caracteres)
   - Confirmar: `12345`
3. Haz clic en "Crear Cuenta"

**Resultado esperado:**
- Mensaje de error: "La contraseña debe tener al menos 6 caracteres"

---

### 2. Autenticación - Login (25 puntos)

#### ✅ Caso 2.1: Login exitoso
**Pasos:**
1. En la pantalla de login
2. Ingresa:
   - Email: `test@ejemplo.com`
   - Contraseña: `password123`
3. Haz clic en "Iniciar Sesión"

**Resultado esperado:**
- Login exitoso
- Redirección al Dashboard
- Ver tus notas (si las hay)

#### ❌ Caso 2.2: Login con credenciales incorrectas
**Pasos:**
1. En la pantalla de login
2. Ingresa:
   - Email: `test@ejemplo.com`
   - Contraseña: `wrongpassword`
3. Haz clic en "Iniciar Sesión"

**Resultado esperado:**
- Mensaje de error: "Credenciales inválidas" o "Contraseña incorrecta"
- No se inicia sesión

#### ❌ Caso 2.3: Login con email no registrado
**Pasos:**
1. En la pantalla de login
2. Ingresa:
   - Email: `noexiste@ejemplo.com`
   - Contraseña: `password123`
3. Haz clic en "Iniciar Sesión"

**Resultado esperado:**
- Mensaje de error: "No existe una cuenta con este correo" o "Credenciales inválidas"

---

### 3. Gestión de Notas - Crear (15 puntos)

#### ✅ Caso 3.1: Crear nota exitosamente
**Pasos:**
1. Estando en el Dashboard
2. En el formulario "Nueva Nota":
   - Título: `Mi primera nota`
   - Contenido: `Este es el contenido de mi primera nota de prueba`
3. Haz clic en "Guardar Nota"

**Resultado esperado:**
- La nota aparece inmediatamente en la lista
- El formulario se limpia
- La nota muestra fecha de creación

#### ❌ Caso 3.2: Intentar crear nota sin título
**Pasos:**
1. En el formulario "Nueva Nota":
   - Título: (vacío)
   - Contenido: `Contenido sin título`
2. Haz clic en "Guardar Nota"

**Resultado esperado:**
- Mensaje de error: "El título es obligatorio"
- No se crea la nota

#### ❌ Caso 3.3: Intentar crear nota sin contenido
**Pasos:**
1. En el formulario "Nueva Nota":
   - Título: `Nota sin contenido`
   - Contenido: (vacío)
2. Haz clic en "Guardar Nota"

**Resultado esperado:**
- Mensaje de error: "El contenido es obligatorio"
- No se crea la nota

#### ✅ Caso 3.4: Crear múltiples notas
**Pasos:**
1. Crea 3 notas diferentes:
   - Nota 1: "Compras" / "Leche, Pan, Huevos"
   - Nota 2: "Ideas" / "Aprender Svelte y Firebase"
   - Nota 3: "Tareas" / "Terminar práctica de programación"

**Resultado esperado:**
- Las 3 notas aparecen en la lista
- Ordenadas por fecha (más reciente primero)

---

### 4. Gestión de Notas - Editar (20 puntos)

#### ✅ Caso 4.1: Editar nota exitosamente
**Pasos:**
1. Haz clic en el botón "Editar" de una nota
2. El formulario cambia a modo edición
3. Modifica:
   - Título: `Mi primera nota EDITADA`
   - Contenido: `Contenido actualizado`
4. Haz clic en "Actualizar"

**Resultado esperado:**
- La nota se actualiza en la lista
- Los cambios se reflejan inmediatamente
- El formulario vuelve a modo creación

#### ✅ Caso 4.2: Cancelar edición
**Pasos:**
1. Haz clic en "Editar" en una nota
2. Modifica el título
3. Haz clic en "Cancelar"

**Resultado esperado:**
- Los cambios NO se guardan
- El formulario vuelve a modo creación
- La nota mantiene sus valores originales

#### ❌ Caso 4.3: Editar dejando campos vacíos
**Pasos:**
1. Haz clic en "Editar" en una nota
2. Borra el título completamente
3. Haz clic en "Actualizar"

**Resultado esperado:**
- Mensaje de error: "El título es obligatorio"
- No se actualiza la nota

---

### 5. Gestión de Notas - Eliminar (15 puntos)

#### ✅ Caso 5.1: Eliminar nota con confirmación
**Pasos:**
1. Haz clic en el botón "Eliminar" de una nota
2. Aparece un diálogo de confirmación
3. Haz clic en "Aceptar"

**Resultado esperado:**
- La nota desaparece de la lista
- El contador de notas se actualiza

#### ✅ Caso 5.2: Cancelar eliminación
**Pasos:**
1. Haz clic en el botón "Eliminar" de una nota
2. Aparece un diálogo de confirmación
3. Haz clic en "Cancelar"

**Resultado esperado:**
- La nota NO se elimina
- La nota permanece en la lista

#### ✅ Caso 5.3: Eliminar todas las notas
**Pasos:**
1. Elimina todas las notas una por una

**Resultado esperado:**
- Mensaje: "No tienes notas todavía"
- Icono y texto de estado vacío
- Contador muestra "(0)"

---

### 6. Tiempo Real (10 puntos)

#### ✅ Caso 6.1: Actualización en tiempo real
**Pasos:**
1. Abre la aplicación en dos pestañas del navegador
2. Inicia sesión con el mismo usuario en ambas
3. En la primera pestaña, crea una nota
4. Observa la segunda pestaña

**Resultado esperado:**
- La nota aparece automáticamente en la segunda pestaña
- Sin necesidad de recargar

#### ✅ Caso 6.2: Eliminación en tiempo real
**Pasos:**
1. Con dos pestañas abiertas
2. En la primera pestaña, elimina una nota
3. Observa la segunda pestaña

**Resultado esperado:**
- La nota desaparece automáticamente en ambas pestañas

---

### 7. Privacidad y Seguridad (15 puntos)

#### ✅ Caso 7.1: Usuarios ven solo sus notas
**Pasos:**
1. Crea notas con el usuario 1
2. Cierra sesión
3. Registra un nuevo usuario 2
4. Inicia sesión con usuario 2

**Resultado esperado:**
- El usuario 2 NO ve las notas del usuario 1
- Cada usuario ve solo sus propias notas

#### ✅ Caso 7.2: Acceso sin autenticación
**Pasos:**
1. Cierra sesión
2. Intenta acceder directamente al Dashboard

**Resultado esperado:**
- Redirección automática a la pantalla de login
- No se puede acceder sin autenticación

---

### 8. Cerrar Sesión (10 puntos)

#### ✅ Caso 8.1: Cerrar sesión exitosamente
**Pasos:**
1. Estando en el Dashboard
2. Haz clic en "Cerrar Sesión"

**Resultado esperado:**
- Sesión cerrada
- Redirección a la pantalla de login
- No se puede volver al Dashboard sin iniciar sesión

---

### 9. Diseño y UX (10 puntos)

#### ✅ Caso 9.1: Diseño responsive
**Pasos:**
1. Abre la aplicación
2. Cambia el tamaño de la ventana del navegador
3. Prueba en diferentes tamaños (móvil, tablet, desktop)

**Resultado esperado:**
- La aplicación se adapta correctamente
- Los botones son accesibles
- El texto es legible
- No hay elementos cortados o superpuestos

#### ✅ Caso 9.2: Estilos y animaciones
**Pasos:**
1. Observa los estilos de la aplicación
2. Pasa el cursor sobre los botones
3. Observa las transiciones

**Resultado esperado:**
- Gradientes aplicados correctamente
- Efectos hover en botones
- Animaciones suaves
- Diseño consistente

---

## 📊 Resumen de Puntuación

| Sección | Puntos |
|---------|--------|
| Configuración del Proyecto | 10 |
| Autenticación (Login + Register) | 50 |
| Dashboard (CRUD de Notas) | 40 |
| Componentización | 25 |
| Cierre de Sesión y Estilos | 10 |
| **TOTAL** | **135** |

## ✨ Funcionalidades Extra Implementadas

- ✅ **Tiempo real** con Firestore onSnapshot
- ✅ **Confirmación** antes de eliminar
- ✅ **Timestamps** con fecha de creación
- ✅ **Iconos SVG** para mejor UX
- ✅ **Loading states** durante operaciones
- ✅ **Diseño responsive** avanzado
- ✅ **Validaciones** exhaustivas
- ✅ **Mensajes de error** personalizados
- ✅ **Animaciones** y transiciones
- ✅ **Estado vacío** con diseño atractivo

## 🎯 Checklist Final

Antes de entregar, verifica que:

- [ ] Firebase Authentication está habilitado
- [ ] Firestore Database está creado
- [ ] Las reglas de Firestore están configuradas
- [ ] Puedes registrar nuevos usuarios
- [ ] Puedes iniciar sesión
- [ ] Puedes crear notas
- [ ] Puedes editar notas
- [ ] Puedes eliminar notas
- [ ] Las notas son privadas por usuario
- [ ] Puedes cerrar sesión
- [ ] El diseño es responsive
- [ ] No hay errores en la consola
- [ ] Todos los componentes están correctamente organizados
- [ ] El código está limpio y comentado

---

¡Todo listo para entregar tu práctica! 🚀✨
