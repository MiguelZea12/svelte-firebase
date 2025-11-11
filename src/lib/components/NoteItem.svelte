<script>
    import { createEventDispatcher } from 'svelte';

    export let note;

    const dispatch = createEventDispatcher();

    function handleEdit() {
        dispatch('edit', note);
    }

    function handleDelete() {
        if (confirm('¿Estás seguro de que deseas eliminar esta nota?')) {
            dispatch('delete', note.id);
        }
    }

    // Formatear fecha
    function formatDate(timestamp) {
        if (!timestamp) return '';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
</script>

<div class="note-item">
    <div class="note-header">
        <h4>{note.title}</h4>
        <div class="note-actions">
            <button class="btn-edit" on:click={handleEdit} title="Editar nota">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Editar
            </button>
            <button class="btn-delete" on:click={handleDelete} title="Eliminar nota">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Eliminar
            </button>
        </div>
    </div>

    <div class="note-content">
        <p>{note.content}</p>
    </div>

    {#if note.createdAt}
        <div class="note-date">
            Creada: {formatDate(note.createdAt)}
        </div>
    {/if}
</div>

<style>
    .note-item {
        background: white;
        padding: 20px;
        border-radius: 8px;
        border: 1px solid #e9ecef;
        transition: all 0.2s;
    }

    .note-item:hover {
        border-color: #dee2e6;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    }

    .note-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 12px;
        gap: 12px;
    }

    h4 {
        margin: 0;
        color: #212529;
        font-size: 16px;
        font-weight: 600;
        flex: 1;
        word-break: break-word;
    }

    .note-actions {
        display: flex;
        gap: 6px;
        flex-shrink: 0;
    }

    .btn-edit,
    .btn-delete {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 10px;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        background: white;
    }

    .btn-edit {
        color: #495057;
    }

    .btn-edit:hover {
        background: #f8f9fa;
        border-color: #adb5bd;
    }

    .btn-delete {
        color: #dc3545;
        border-color: #f8d7da;
    }

    .btn-delete:hover {
        background: #fff5f5;
        border-color: #dc3545;
    }

    .note-content {
        margin-bottom: 12px;
    }

    .note-content p {
        margin: 0;
        color: #495057;
        line-height: 1.6;
        white-space: pre-wrap;
        word-break: break-word;
        font-size: 14px;
    }

    .note-date {
        font-size: 12px;
        color: #adb5bd;
    }

    @media (max-width: 600px) {
        .note-header {
            flex-direction: column;
        }

        .note-actions {
            width: 100%;
            justify-content: flex-start;
        }

        .btn-edit,
        .btn-delete {
            flex: 1;
            justify-content: center;
        }
    }
</style>
