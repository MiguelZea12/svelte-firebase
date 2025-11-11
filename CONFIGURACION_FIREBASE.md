# 🔥 Guía de Configuración de Firebase para NotasApp

## Paso 1: Configurar Authentication

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **svelte-firebase-85bd6**
3. En el menú lateral, haz clic en **Authentication**
4. Haz clic en **Get Started** (si no lo has hecho)
5. Ve a la pestaña **Sign-in method**
6. Habilita **Email/Password**:
   - Haz clic en "Email/Password"
   - Activa el switch
   - Guarda los cambios

## Paso 2: Crear Firestore Database

1. En el menú lateral de Firebase Console, haz clic en **Firestore Database**
2. Haz clic en **Create database**
3. Selecciona la ubicación (recomendado: `us-central` o el más cercano a ti)
4. Elige **Start in production mode** (luego configuraremos las reglas)
5. Haz clic en **Enable**

## Paso 3: Configurar Reglas de Seguridad

1. Una vez creada la base de datos, ve a la pestaña **Rules**
2. Reemplaza las reglas existentes con las siguientes:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read: if request.auth != null 
                  && resource.data.userId == request.auth.uid;
      
      allow create: if request.auth != null 
                    && request.resource.data.userId == request.auth.uid
                    && request.resource.data.title is string
                    && request.resource.data.content is string;
      
      allow update: if request.auth != null 
                    && resource.data.userId == request.auth.uid
                    && request.resource.data.userId == request.auth.uid;
      
      allow delete: if request.auth != null 
                    && resource.data.userId == request.auth.uid;
    }
  }
}
```

3. Haz clic en **Publish** para guardar las reglas

## Paso 4: Verificar Configuración

### Tu archivo firebase.js ya está configurado con:

```javascript
apiKey: "AIzaSyCeDaHC-xIQOYp5ZbxWtbsdu-lmHGrDSXQ"
authDomain: "svelte-firebase-85bd6.firebaseapp.com"
projectId: "svelte-firebase-85bd6"
```

### ✅ Checklist de Configuración

- [ ] Firebase Authentication habilitado con Email/Password
- [ ] Firestore Database creado
- [ ] Reglas de seguridad configuradas
- [ ] Archivo `firebase.js` con las credenciales correctas

## Paso 5: Probar la Aplicación

1. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador en: http://localhost:5173

3. Prueba estas funcionalidades:
   - ✅ Registrar un nuevo usuario
   - ✅ Iniciar sesión
   - ✅ Crear una nota
   - ✅ Editar una nota
   - ✅ Eliminar una nota
   - ✅ Cerrar sesión

## 🔍 Verificar en Firebase Console

### Authentication
Ve a **Authentication → Users** y deberías ver:
- Los usuarios registrados
- Su email y fecha de creación

### Firestore
Ve a **Firestore Database → Data** y deberías ver:
- Colección: `notes`
- Documentos con campos:
  - `title` (string)
  - `content` (string)
  - `userId` (string)
  - `createdAt` (timestamp)

## 🐛 Solución de Problemas Comunes

### Error: "Permission denied"
**Solución:** Verifica que las reglas de Firestore estén correctamente configuradas

### Error: "auth/operation-not-allowed"
**Solución:** Asegúrate de haber habilitado Email/Password en Authentication

### Las notas no aparecen
**Solución:** 
1. Abre la consola del navegador (F12)
2. Busca errores en la pestaña Console
3. Verifica que el usuario esté autenticado
4. Comprueba las reglas de Firestore

### Error: "Firebase: Error (auth/invalid-email)"
**Solución:** Asegúrate de usar un formato de email válido (ejemplo@dominio.com)

### Error: "Firebase: Error (auth/weak-password)"
**Solución:** La contraseña debe tener al menos 6 caracteres

## 📊 Estructura de Datos Esperada

### Colección: notes

```
notes (collection)
  └── [auto-id] (document)
      ├── title: "Mi primera nota"
      ├── content: "Contenido de la nota..."
      ├── userId: "xyz123..." (UID del usuario)
      ├── createdAt: Timestamp
      └── updatedAt: Timestamp (opcional)
```

## 🎯 Resultado Esperado

Una vez configurado correctamente:
- ✅ Los usuarios pueden registrarse e iniciar sesión
- ✅ Cada usuario solo ve sus propias notas
- ✅ Las notas se actualizan en tiempo real
- ✅ No hay errores en la consola del navegador
- ✅ Las operaciones CRUD funcionan correctamente

## 📝 Notas Importantes

1. **Seguridad**: Las reglas configuradas garantizan que cada usuario solo pueda acceder a sus propias notas
2. **Tiempo Real**: Gracias a `onSnapshot`, las notas se actualizan automáticamente sin necesidad de recargar
3. **Validación**: Tanto en el cliente (Svelte) como en el servidor (Firestore Rules) hay validación
4. **Escalabilidad**: La aplicación está lista para múltiples usuarios simultáneos

---

¿Todo listo? ¡Ahora puedes usar NotasApp! 🚀
