<script setup>
import { onMounted, ref } from 'vue';
import InfoBlue from '../../Icons/InfoBlue.vue';

const showConnectionSuccess = ref(false);
const isLoading = ref(false);

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

const togglePasswordVisibility = (fieldId) => {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
    } else {
        field.type = 'password';
    }
}

const handleConnectionSubmit = (event) => {
    event.preventDefault();
    isLoading.value = true;
    showConnectionSuccess.value = false;

    // Simulate connection delay
    setTimeout(() => {
        isLoading.value = false;
        showConnectionSuccess.value = true;
    }, 2500);
}
</script>

<template>
    <div class="card step-two-card">
        <div class="form-container">
            <div class="mb-4">
                <h1 class="form-title">Connect to Retail Express</h1>
                <p class="form-subtitle">Enter your Retail Express credentials to establish a secure connection.</p>
            </div>

            <form>
                <div class="mb-3">
                    <label for="domain" class="form-label d-flex align-items-center">
                        Retail Express Domain URL <span class="required">*</span>
                        <info-blue is-small
                            title="Your Retail Express domain URL (e.g., https://yourstore.retailexpress.com.au)"
                            tooltip-placement="right" />
                    </label>
                    <input type="url" class="form-control" id="domain"
                        placeholder="https://yourretailexpresssite.retailexpress.com.au">
                </div>

                <div class="mb-3">
                    <label for="username" class="form-label d-flex align-items-center">
                        Username <span class="required">*</span>
                        <info-blue is-small title="Your Retail Express username for API access"
                            tooltip-placement="right" />
                    </label>
                    <input type="text" class="form-control" id="username" placeholder="Enter your username">
                </div>

                <div class="mb-3 col-md-6">
                    <label for="password" class="form-label d-flex align-items-center">
                        Password <span class="required">*</span>
                        <info-blue is-small title="Your Retail Express password for API authentication"
                            tooltip-placement="right" />
                    </label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="password" placeholder="Enter your password">
                        <button type="button" class="password-toggle"
                            @click.prevent="togglePasswordVisibility('password')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" class="eye-icon">
                                <path
                                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                                </path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="mb-3 col-md-6">
                    <label for="clientId" class="form-label d-flex align-items-center">
                        Client ID <span class="required">*</span>
                        <info-blue is-small title="Your API Client ID provided by Retail Express"
                            tooltip-placement="right" />
                    </label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="clientId" placeholder="Enter your Client ID">
                        <button type="button" class="password-toggle"
                            @click.prevent="togglePasswordVisibility('clientId')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" class="eye-icon">
                                <path
                                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                                </path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="mb-3">
                    <label for="channelId" class="form-label d-flex align-items-center">
                        Channel ID <span class="required">*</span>
                        <info-blue is-small title="The channel ID for your Retail Express integration"
                            tooltip-placement="right" />
                    </label>
                    <input type="number" class="form-control" id="channelId"
                        placeholder="Enter Channel ID (e.g. 1, 2, 3)">
                </div>

                <div class="mb-3 col-md-6">
                    <label for="primaryKey" class="form-label d-flex align-items-center">
                        Primary Key <span class="required">*</span>
                        <info-blue is-small title="Primary encryption key for secure API communication"
                            tooltip-placement="right" />
                    </label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="primaryKey"
                            placeholder="Enter your Primary Key">
                        <button type="button" class="password-toggle"
                            @click.prevent="togglePasswordVisibility('primaryKey')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" class="eye-icon">
                                <path
                                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                                </path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="mb-3 col-md-6">
                    <label for="secondaryKey" class="form-label d-flex align-items-center">
                        Secondary Key <span class="required">*</span>
                        <info-blue is-small title="Secondary encryption key for additional security"
                            tooltip-placement="right" />
                    </label>
                    <div class="input-group">
                        <input type="password" class="form-control" id="secondaryKey"
                            placeholder="Enter your Secondary Key">
                        <button type="button" class="password-toggle"
                            @click.prevent="togglePasswordVisibility('secondaryKey')">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" class="eye-icon">
                                <path
                                    d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0">
                                </path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>

                <div v-if="!showConnectionSuccess" class="btn-container text-center">
                    <button class="connect-btn" @click.prevent="handleConnectionSubmit" :disabled="isLoading">
                        <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" class="wifi-icon">
                            <path d="M12 20h.01"></path>
                            <path d="M2 8.82a15 15 0 0 1 20 0"></path>
                            <path d="M5 12.859a10 10 0 0 1 14 0"></path>
                            <path d="M8.5 16.429a5 5 0 0 1 7 0"></path>
                        </svg>

                        <div v-if="isLoading" class="spinner-wrapper">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        {{ isLoading ? 'Connecting to Retail Express...' : 'Connect to Retail Express' }}
                    </button>
                </div>

                <div v-if="showConnectionSuccess" class="btn-container d-flex justify-content-center">
                    <div class="alert alert-success d-flex align-items-center gap-3 mb-4 alert-custom" role="alert">
                        <div class="success-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="success-icon">
                                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                                <path d="m9 11 3 3L22 4"></path>
                            </svg>
                        </div>
                        <div class="d-flex flex-column">
                            <span class="fw-medium text-success-emphasis" style="font-size: 14px;">
                                Connection Verified
                            </span>
                            <span class="text-success" style="font-size: 12px;">
                                Successfully connected to Retail Express
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.step-two-card {
    background: #fff;
    border-radius: 14px;
    margin-bottom: 2rem;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.form-container {
    max-width: 100%;
    padding: 33px;
}

.form-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #101828;
    margin-bottom: 12px;
}

.form-subtitle {
    font-size: 14px;
    line-height: 20px;
    color: #4a5565;
    margin-bottom: 24px;
}

.form-label {
    font-size: 14px;
    font-weight: 500;
    color: #101828;
    margin-bottom: 8px;
}

.required {
    color: #F20F52;
    margin-left: .25rem;
    margin-right: .5rem;
}

.form-control {
    height: 36px;
    font-size: 14px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
}

.input-group {
    position: relative;
}

.password-toggle {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6b7280;
    padding: 0;
    cursor: pointer;
    z-index: 10;
}

.password-toggle:hover {
    color: #374151;
}

.eye-icon {
    width: 16px;
    height: 16px;
}

.connect-btn {
    background-color: #5a67d8;
    border: none;
    color: white;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    transition: background-color 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.connect-btn:hover {
    background-color: #4c51d4;
}

.connect-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    font-size: 14px;
}

.wifi-icon {
    width: 20px;
    height: 20px;
}

.btn-container {
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
    margin-top: 24px;
}

/* Alert Custom Width */
.alert-custom {
    width: 28rem;
    border-radius: 8px;
    padding: 1rem;
}

.spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.spinner-border {
    width: 24px;
    height: 24px;
    border-width: 2px;
}

/* Success Alert Styling */
.alert-success {
    background-color: #f0fdf4;
    border-color: #bbf7d0;
    border-radius: 8px;
    padding: 1rem;
}

.success-icon-wrapper {
    background-color: #dcfce7;
    border-radius: 50%;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.success-icon {
    width: 20px;
    height: 20px;
    color: #16a34a;
}
</style>
