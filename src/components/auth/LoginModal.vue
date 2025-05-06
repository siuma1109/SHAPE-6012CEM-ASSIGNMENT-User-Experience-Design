<template>
    <div v-if="isLoginModalOpen" class="modal-backdrop" @click="closeModal">
        <div class="modal-content" @click.stop>
            <div class="modal-header">
                <h2 class="modal-title">Welcome to <span class="brand-name">PNS.hk</span></h2>
                <button class="close-button" @click="closeModal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div class="social-logins">
                <button class="social-login-button google">
                    <img src="@/assets/images/auth/google-icon.svg" alt="Google" class="social-icon" />
                    Login with Google
                </button>

                <button class="social-login-button facebook">
                    <img src="@/assets/images/auth/facebook-icon.svg" alt="Facebook" class="social-icon" />
                    Login with Facebook
                </button>
            </div>

            <div class="divider">
                <span class="divider-line"></span>
                <span class="divider-text">OR</span>
                <span class="divider-line"></span>
            </div>

            <form @submit.prevent="login" class="login-form">
                <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <div class="input-with-icon">
                        <div class="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z">
                                </path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                        </div>
                        <input type="email" id="email" v-model="email" placeholder="Email" class="form-input"
                            required />
                    </div>
                </div>

                <div class="form-group">
                    <label for="password" class="sr-only">Password</label>
                    <div class="input-with-icon">
                        <div class="input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                        </div>
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                            placeholder="Password" class="form-input" required />
                        <button type="button" class="password-toggle" @click="togglePasswordVisibility" tabindex="-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="form-options">
                    <div class="remember-me">
                        <input type="checkbox" id="remember" v-model="rememberMe" />
                        <label for="remember">Remember me</label>
                    </div>
                    <a href="#" class="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" class="login-button">Login</button>
            </form>

            <div class="register-link">
                Don't have an account? <a href="#">Register</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { isLoginModalOpen, ModalController } from './ModalController';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);

// Expose static methods for LoginModal
defineExpose({
    open: ModalController.open,
    close: ModalController.close
});

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const login = () => {
    // Implement login logic here
    console.log('Login with:', { email: email.value, password: password.value, rememberMe: rememberMe.value });
};

const closeModal = () => {
    ModalController.close();
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modal-content {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.modal-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #333;
}

.brand-name {
    color: #4169e1;
}

.close-button {
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
}

.social-logins {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.social-login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #e5e7eb;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
}

.social-login-button:hover {
    background-color: #f9fafb;
}

.social-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}

.divider {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
}

.divider-line {
    flex: 1;
    height: 1px;
    background-color: #e5e7eb;
}

.divider-text {
    padding: 0 1rem;
    color: #6b7280;
    font-size: 0.875rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

.input-with-icon {
    display: flex;
    align-items: center;
    position: relative;
    background-color: #f3f4f6;
    border-radius: 4px;
}

.input-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.75rem;
    color: #6b7280;
}

.form-input {
    width: 100%;
    padding: 0.75rem;
    background-color: #f3f4f6;
    border: none;
    border-radius: 4px;
    outline: none;
}

.password-toggle {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #6b7280;
}

.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.remember-me {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.forgot-password {
    color: #4169e1;
    text-decoration: none;
    font-size: 0.875rem;
}

.login-button {
    padding: 0.75rem;
    background-color: #4169e1;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

.login-button:hover {
    background-color: #3558ca;
}

.register-link {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
}

.register-link a {
    color: #4169e1;
    text-decoration: none;
    font-weight: 500;
}
</style>
