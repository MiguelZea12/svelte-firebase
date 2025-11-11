<script>
    import { auth } from '$lib/firebase';
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let email = '';
    let password = '';
    let confirmPassword = '';
    let error = '';
    let loading = false;

    async function handleRegister() {
        // Validación básica
        if (!email || !password || !confirmPassword) {
            error = 'Por favor, completa todos los campos';
            return;
        }

        if (!email.includes('@')) {
            error = 'Por favor, ingresa un correo válido';
            return;
        }

        if (password.length < 6) {
            error = 'La contraseña debe tener al menos 6 caracteres';
            return;
        }

        if (password !== confirmPassword) {
            error = 'Las contraseñas no coinciden';
            return;
        }

        loading = true;
        error = '';

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            dispatch('registerSuccess');
        } catch (err) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    error = 'Este correo ya está registrado';
                    break;
                case 'auth/invalid-email':
                    error = 'Correo electrónico inválido';
                    break;
                case 'auth/weak-password':
                    error = 'La contraseña es muy débil';
                    break;
                default:
                    error = 'Error al registrar: ' + err.message;
            }
        } finally {
            loading = false;
        }
    }

    function goToLogin() {
        dispatch('switchToLogin');
    }
</script>

<div class="register-container">
    <div class="register-card">
        <h2>Crear Cuenta</h2>
        <p class="subtitle">Regístrate para comenzar</p>

        <form on:submit|preventDefault={handleRegister}>
            <div class="form-group">
                <label for="email">Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    placeholder="correo@ejemplo.com"
                    disabled={loading}
                />
            </div>

            <div class="form-group">
                <label for="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    bind:value={password}
                    placeholder="Mínimo 6 caracteres"
                    disabled={loading}
                />
            </div>

            <div class="form-group">
                <label for="confirmPassword">Confirmar Contraseña</label>
                <input
                    id="confirmPassword"
                    type="password"
                    bind:value={confirmPassword}
                    placeholder="Repite tu contraseña"
                    disabled={loading}
                />
            </div>

            {#if error}
                <div class="error-message">
                    {error}
                </div>
            {/if}

            <button type="submit" class="btn-primary" disabled={loading}>
                {loading ? 'Registrando...' : 'Crear Cuenta'}
            </button>
        </form>

        <div class="switch-mode">
            <p>¿Ya tienes una cuenta?</p>
            <button type="button" on:click={goToLogin} class="btn-link">
                Inicia sesión aquí
            </button>
        </div>
    </div>
</div>

<style>
    .register-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #f8f9fa;
        padding: 20px;
    }

    .register-card {
        background: white;
        padding: 48px 40px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        width: 100%;
        max-width: 420px;
        border: 1px solid #e9ecef;
    }

    h2 {
        margin: 0 0 8px 0;
        color: #212529;
        text-align: center;
        font-weight: 600;
        font-size: 24px;
    }

    .subtitle {
        text-align: center;
        color: #6c757d;
        margin: 0 0 32px 0;
        font-size: 14px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        color: #495057;
        font-weight: 500;
        font-size: 14px;
    }

    input {
        width: 100%;
        padding: 11px 14px;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        font-size: 15px;
        box-sizing: border-box;
        transition: all 0.2s;
        font-family: inherit;
    }

    input:focus {
        outline: none;
        border-color: #4a5568;
        box-shadow: 0 0 0 3px rgba(74, 85, 104, 0.1);
    }

    input:disabled {
        background-color: #f8f9fa;
        cursor: not-allowed;
        opacity: 0.6;
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

    .btn-primary {
        width: 100%;
        padding: 12px;
        background: #2d3748;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
        background: #1a202c;
    }

    .btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .switch-mode {
        margin-top: 24px;
        text-align: center;
    }

    .switch-mode p {
        color: #6c757d;
        margin: 0 0 8px 0;
        font-size: 14px;
    }

    .btn-link {
        background: none;
        border: none;
        color: #2d3748;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        padding: 4px 0;
    }

    .btn-link:hover {
        text-decoration: underline;
    }
</style>
