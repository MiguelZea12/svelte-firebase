<script>
    import { onMount } from 'svelte';
    import { auth } from '$lib/firebase';
    import { onAuthStateChanged } from 'firebase/auth';
    
    import Login from '$lib/components/Login.svelte';
    import Register from '$lib/components/Register.svelte';
    import Dashboard from '$lib/components/Dashboard.svelte';

    let currentView = 'login'; // 'login', 'register', 'dashboard'
    let user = null;
    let loading = true;

    onMount(() => {
        // Escuchar cambios en el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            user = firebaseUser;
            
            if (firebaseUser) {
                currentView = 'dashboard';
            } else {
                currentView = 'login';
            }
            
            loading = false;
        });

        // Limpiar suscripción
        return unsubscribe;
    });

    function handleLoginSuccess() {
        currentView = 'dashboard';
    }

    function handleRegisterSuccess() {
        currentView = 'dashboard';
    }

    function handleSwitchToRegister() {
        currentView = 'register';
    }

    function handleSwitchToLogin() {
        currentView = 'login';
    }

    function handleLogout() {
        currentView = 'login';
        user = null;
    }
</script>

{#if loading}
    <div class="loading-container">
        <div class="loading-spinner"></div>
        <p>Cargando...</p>
    </div>
{:else if currentView === 'login'}
    <Login 
        on:loginSuccess={handleLoginSuccess}
        on:switchToRegister={handleSwitchToRegister}
    />
{:else if currentView === 'register'}
    <Register 
        on:registerSuccess={handleRegisterSuccess}
        on:switchToLogin={handleSwitchToLogin}
    />
{:else if currentView === 'dashboard'}
    <Dashboard on:logout={handleLogout} />
{/if}

<style>
    .loading-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #f8f9fa;
        color: #495057;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid #e9ecef;
        border-top-color: #495057;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .loading-container p {
        margin-top: 16px;
        font-size: 14px;
        color: #6c757d;
    }
</style>
