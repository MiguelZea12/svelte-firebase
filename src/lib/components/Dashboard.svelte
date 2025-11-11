<script>
    import { onMount } from 'svelte';
    import { auth, db } from '$lib/firebase';
    import { signOut } from 'firebase/auth';
    import { 
        collection, 
        addDoc, 
        query, 
        where, 
        orderBy, 
        onSnapshot,
        doc,
        updateDoc,
        deleteDoc,
        serverTimestamp
    } from 'firebase/firestore';
    import { createEventDispatcher } from 'svelte';
    
    import NoteForm from './NoteForm.svelte';
    import NoteItem from './NoteItem.svelte';

    const dispatch = createEventDispatcher();

    let user = null;
    let notes = [];
    let loading = true;
    let editingNote = null;
    let unsubscribe = null;

    onMount(() => {
        // Verificar si hay usuario autenticado
        user = auth.currentUser;
        
        if (!user) {
            dispatch('logout');
            return;
        }

        console.log('Usuario autenticado:', user.uid);

        // Suscribirse a las notas del usuario en tiempo real
        const notesRef = collection(db, 'notes');
        const q = query(
            notesRef, 
            where('userId', '==', user.uid)
        );

        unsubscribe = onSnapshot(q, (snapshot) => {
            notes = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Ordenar en el cliente (más recientes primero)
            notes.sort((a, b) => {
                if (!a.createdAt) return 1;
                if (!b.createdAt) return -1;
                return b.createdAt.seconds - a.createdAt.seconds;
            });
            loading = false;
            console.log('Notas cargadas:', notes.length); // Para debug
        }, (error) => {
            console.error('Error al cargar notas:', error);
            loading = false;
        });

        // Limpiar suscripción al desmontar el componente
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    });

    async function handleSaveNote(event) {
        const { title, content } = event.detail;

        console.log('Guardando nota:', { title, content, userId: user.uid });

        try {
            const docRef = await addDoc(collection(db, 'notes'), {
                title,
                content,
                userId: user.uid,
                createdAt: serverTimestamp()
            });
            console.log('Nota guardada con ID:', docRef.id);
        } catch (error) {
            console.error('Error al guardar nota:', error);
            alert('Error al guardar la nota: ' + error.message);
        }
    }

    async function handleUpdateNote(event) {
        const { id, title, content } = event.detail;

        try {
            const noteRef = doc(db, 'notes', id);
            await updateDoc(noteRef, {
                title,
                content,
                updatedAt: serverTimestamp()
            });
            
            // Salir del modo edición
            editingNote = null;
        } catch (error) {
            console.error('Error al actualizar nota:', error);
            alert('Error al actualizar la nota: ' + error.message);
        }
    }

    function handleEditNote(event) {
        editingNote = event.detail;
    }

    async function handleDeleteNote(event) {
        const noteId = event.detail;

        try {
            await deleteDoc(doc(db, 'notes', noteId));
        } catch (error) {
            console.error('Error al eliminar nota:', error);
            alert('Error al eliminar la nota: ' + error.message);
        }
    }

    function handleCancelEdit() {
        editingNote = null;
    }

    function handleModalContentClick(event) {
        event.stopPropagation();
    }

    async function handleLogout() {
        try {
            await signOut(auth);
            dispatch('logout');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            alert('Error al cerrar sesión: ' + error.message);
        }
    }
</script>

<div class="dashboard">
    <header class="dashboard-header">
        <div class="header-content">
            <div class="header-left">
                <h1>Mis Notas</h1>
                {#if user}
                    <p class="user-info">{user.email}</p>
                {/if}
            </div>
            <button class="btn-logout" on:click={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Salir
            </button>
        </div>
    </header>

    <main class="dashboard-main">
        <div class="container">
            <!-- Formulario de nota -->
            <NoteForm on:save={handleSaveNote} />

            <!-- Lista de notas -->
            <section class="notes-section">
                <h2>Todas las notas ({notes.length})</h2>

                {#if loading}
                    <div class="loading">
                        <p>Cargando...</p>
                    </div>
                {:else if notes.length === 0}
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        <h3>Sin notas</h3>
                        <p>Crea tu primera nota</p>
                    </div>
                {:else}
                    <div class="notes-grid">
                        {#each notes as note (note.id)}
                            <NoteItem 
                                {note} 
                                on:edit={handleEditNote}
                                on:delete={handleDeleteNote}
                            />
                        {/each}
                    </div>
                {/if}
            </section>
        </div>
    </main>

    <!-- Modal para editar -->
    {#if editingNote}
        <div 
            class="modal-overlay" 
            on:click={handleCancelEdit}
            on:keydown={(e) => e.key === 'Escape' && handleCancelEdit()}
            role="button"
            tabindex="-1"
            aria-label="Cerrar modal"
        >
            <!-- svelte-ignore a11y_interactive_supports_focus -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div 
                class="modal-content"
                on:click={handleModalContentClick}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div class="modal-header">
                    <h3 id="modal-title">Editar Nota</h3>
                    <button class="btn-close" on:click={handleCancelEdit} aria-label="Cerrar modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <NoteForm 
                    note={editingNote} 
                    isEditing={true}
                    on:update={handleUpdateNote}
                    on:cancel={handleCancelEdit}
                />
            </div>
        </div>
    {/if}
</div>

<style>
    .dashboard {
        min-height: 100vh;
        background: #f8f9fa;
    }

    .dashboard-header {
        background: white;
        border-bottom: 1px solid #e9ecef;
        padding: 20px 0;
    }

    .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
    }

    .header-left h1 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #212529;
    }

    .user-info {
        margin: 4px 0 0 0;
        color: #6c757d;
        font-size: 14px;
    }

    .btn-logout {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        background: white;
        color: #495057;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-logout:hover {
        background: #f8f9fa;
        border-color: #adb5bd;
    }

    .dashboard-main {
        padding: 32px 0;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
    }

    .notes-section {
        margin-top: 32px;
    }

    .notes-section h2 {
        color: #212529;
        margin: 0 0 20px 0;
        font-size: 18px;
        font-weight: 600;
    }

    .loading {
        text-align: center;
        padding: 60px 20px;
        color: #6c757d;
        font-size: 14px;
    }

    .empty-state {
        text-align: center;
        padding: 80px 20px;
        color: #adb5bd;
    }

    .empty-state svg {
        margin-bottom: 20px;
        opacity: 0.4;
    }

    .empty-state h3 {
        color: #6c757d;
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 500;
    }

    .empty-state p {
        margin: 0;
        font-size: 14px;
        color: #adb5bd;
    }

    .notes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
    }

    /* Modal styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
        animation: fadeIn 0.2s ease-out;
    }

    .modal-overlay:focus {
        outline: none;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .modal-content {
        background: white;
        border-radius: 8px;
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideUp 0.2s ease-out;
    }

    @keyframes slideUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid #e9ecef;
    }

    .modal-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #212529;
    }

    .btn-close {
        background: none;
        border: none;
        padding: 4px;
        cursor: pointer;
        color: #6c757d;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
    }

    .btn-close:hover {
        background: #f8f9fa;
        color: #212529;
    }

    @media (max-width: 768px) {
        .header-content {
            flex-direction: column;
            text-align: center;
        }

        .header-left {
            width: 100%;
        }

        .notes-grid {
            grid-template-columns: 1fr;
        }

        .dashboard-main {
            padding: 24px 0;
        }

        .container {
            padding: 0 16px;
        }
    }
</style>
