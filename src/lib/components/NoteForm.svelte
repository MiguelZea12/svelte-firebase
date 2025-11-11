<script>
    import { createEventDispatcher } from 'svelte';

    export let note = null; // Si se pasa una nota, está en modo edición
    export let isEditing = false;

    const dispatch = createEventDispatcher();

    let title = note?.title || '';
    let content = note?.content || '';
    let error = '';

    // Actualizar valores si la nota cambia (modo edición)
    $: if (note) {
        title = note.title;
        content = note.content;
    }

    function handleSubmit() {
        // Validación básica
        if (!title.trim()) {
            error = 'El título es obligatorio';
            return;
        }

        if (!content.trim()) {
            error = 'El contenido es obligatorio';
            return;
        }

        error = '';

        if (isEditing && note) {
            // Modo edición: emitir evento update
            dispatch('update', {
                id: note.id,
                title: title.trim(),
                content: content.trim()
            });
        } else {
            // Modo creación: emitir evento save
            dispatch('save', {
                title: title.trim(),
                content: content.trim()
            });
        }

        // Limpiar formulario si es creación
        if (!isEditing) {
            title = '';
            content = '';
        }
    }

    function handleCancel() {
        dispatch('cancel');
        title = '';
        content = '';
        error = '';
    }
</script>

<div class="note-form" class:editing={isEditing}>
    {#if !isEditing}
        <h3>Nueva Nota</h3>
    {/if}

    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="title">Título</label>
            <input
                id="title"
                type="text"
                bind:value={title}
                placeholder="Título de la nota"
                maxlength="100"
            />
        </div>

        <div class="form-group">
            <label for="content">Contenido</label>
            <textarea
                id="content"
                bind:value={content}
                placeholder="Escribe aquí el contenido de tu nota..."
                rows="5"
            ></textarea>
        </div>

        {#if error}
            <div class="error-message">
                {error}
            </div>
        {/if}

        <div class="form-actions">
            <button type="submit" class="btn-save">
                {isEditing ? 'Actualizar' : 'Guardar Nota'}
            </button>
            {#if isEditing}
                <button type="button" class="btn-cancel" on:click={handleCancel}>
                    Cancelar
                </button>
            {/if}
        </div>
    </form>
</div>

<style>
    .note-form {
        background: white;
        padding: 24px;
        border-radius: 8px;
        border: 1px solid #e9ecef;
        margin-bottom: 32px;
    }

    .note-form.editing {
        border: none;
        border-radius: 0;
        margin-bottom: 0;
    }

    h3 {
        margin: 0 0 20px 0;
        color: #212529;
        font-size: 16px;
        font-weight: 600;
    }

    .form-group {
        margin-bottom: 16px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        color: #495057;
        font-weight: 500;
        font-size: 14px;
    }

    input,
    textarea {
        width: 100%;
        padding: 11px 14px;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        font-size: 15px;
        box-sizing: border-box;
        font-family: inherit;
        transition: all 0.2s;
    }

    input:focus,
    textarea:focus {
        outline: none;
        border-color: #4a5568;
        box-shadow: 0 0 0 3px rgba(74, 85, 104, 0.1);
    }

    textarea {
        resize: vertical;
        min-height: 120px;
        line-height: 1.5;
    }

    .error-message {
        background-color: #fff5f5;
        color: #c53030;
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 14px;
        border: 1px solid #feb2b2;
    }

    .form-actions {
        display: flex;
        gap: 10px;
    }

    .btn-save {
        flex: 1;
        padding: 11px 20px;
        background: #2d3748;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-save:hover {
        background: #1a202c;
    }

    .btn-cancel {
        padding: 11px 20px;
        background: white;
        color: #495057;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-cancel:hover {
        background: #f8f9fa;
    }
</style>
