<template>
    <div class="container-fluid px-3 px-md-5 mt-5">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                <h1 class="text-center mb-4">User Information Form</h1>
                <form @submit="submitForm">
                    <div class="row mb-3">
                        <!-- Username and password row -->
                        <div class="col-12 col-md-6 mb-3">
                            <label for="username" class="form-label">Username:</label>
                            <input type="text" class="form-control" id="username" 
                                   @blur="() => validateName(true)" 
                                   @input="() => validateName(false)" 
                                   v-model="formData.username" >
                            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                        </div>
                        <div class="col-12 col-md-6 mb-3">
                            <label for="password" class="form-label">Password:</label>
                            <input type="password" class="form-control" id="password" 
                                   @blur="() => validatePassword(true)" 
                                   @input="() => validatePassword(false)" 
                                   v-model="formData.password">
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <!-- Resident status and gender row -->
                        <div class="col-12 col-md-6 mb-3">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="isAustralian" 
                                       @change="validateResident" 
                                       v-model="formData.isAustralian">
                                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                            </div>
                            <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
                        </div>
                        <div class="col-12 col-md-6 mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-select" id="gender" 
                                    @blur="validateGender" 
                                    @change="validateGender" 
                                    v-model="formData.gender">
                                <option value="" disabled>Please select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label">Reason for joining:</label>
                        <textarea class="form-control" id="reason" rows="3" 
                                  @blur="() => validateReason(true)" 
                                  @input="() => validateReason(false)" 
                                  v-model="formData.reason" 
                                  placeholder="Please provide at least 10 characters explaining your reason for joining"></textarea>
                        <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
                    </div>
                    <div class="d-grid d-md-flex justify-content-md-center gap-2">
                        <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                        <button type="button" class="btn btn-secondary btn-lg" @click="clearForm">Clear</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- PrimeVue DataTable Section -->
        <div class="row mt-5" v-if="submittedCards.length">
            <div class="col-12">
                <h2 class="text-center mb-4">Submitted User Information</h2>
                <DataTable :value="submittedCards" 
                          tableStyle="min-width: 50rem">
                    
                    <Column field="username" header="Username">
                    </Column>
                    
                    <Column field="password" header="Password">
                    </Column>
                    
                    <Column field="isAustralian" header="Australian Resident">
                        <template #body="slotProps">
                            {{ slotProps.data.isAustralian ? 'Yes' : 'No' }}
                        </template>
                    </Column>
                    
                    <Column field="gender" header="Gender">
                    </Column>
                    
                    <Column field="reason" header="Reason for Joining">
                    </Column>
                    
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const formData = ref({
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
});

const submittedCards = ref([]);

// Define errors object to store validation errors
const errors = ref({
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
});

// Validation function for username
const validateName = (blur) => {
    if (formData.value.username.length < 3) {
        if (blur) errors.value.username = "Name must be at least 3 characters";
    } else {
        errors.value.username = null;
    }
};

// Validation function for password
const validatePassword = (blur) => {
    const password = formData.value.password;
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
        if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUppercase) {
        if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
    } else if (!hasLowercase) {
        if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
        if (blur) errors.value.password = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
        if (blur) errors.value.password = "Password must contain at least one special character.";
    } else {
        errors.value.password = null;
    }
};

// Validation function for Australian resident
const validateResident = () => {
    // This is optional validation - you can add specific logic if needed
    // For now, we'll clear any existing errors
    errors.value.resident = null;
};

// Validation function for gender
const validateGender = () => {
    if (!formData.value.gender) {
        errors.value.gender = "Please select your gender.";
    } else {
        errors.value.gender = null;
    }
};

// Validation function for reason
const validateReason = (blur) => {
    if (formData.value.reason.length < 10) {
        if (blur) errors.value.reason = "Reason must be at least 10 characters long.";
    } else if (formData.value.reason.length > 500) {
        if (blur) errors.value.reason = "Reason must not exceed 500 characters.";
    } else {
        errors.value.reason = null;
    }
};

const submitForm = (event) => {
    event.preventDefault();
    
    // Validate all fields before submission
    validateName(true);
    validatePassword(true);
    validateGender();
    validateReason(true);
    
    // Only submit if there are no errors
    if (!errors.value.username && !errors.value.password && !errors.value.gender && !errors.value.reason) {
        submittedCards.value.push({
            ...formData.value
        });
        clearForm();
    }
};

const clearForm = () => {
    formData.value.username = '';
    formData.value.password = '';
    formData.value.isAustralian = false;
    formData.value.gender = '';
    formData.value.reason = '';
    
    // Clear all errors when form is cleared
    errors.value.username = null;
    errors.value.password = null;
    errors.value.resident = null;
    errors.value.gender = null;
    errors.value.reason = null;
};

// New function to delete individual records
const deleteRecord = (index) => {
    submittedCards.value.splice(index, 1);
};

// New function to clear all records
const clearAllRecords = () => {
    submittedCards.value = [];
};
</script>

<style scoped>
/* Enhanced styling for better presentation */
.password-mask {
    font-family: monospace;
    color: #6c757d;
}

.reason-text {
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: help;
}

.badge {
    font-size: 0.75em;
    padding: 0.25em 0.5em;
    border-radius: 0.25rem;
}

.bg-success {
    background-color: #198754 !important;
    color: white;
}

.bg-secondary {
    background-color: #6c757d !important;
    color: white;
}

.text-capitalize {
    text-transform: capitalize;
}

/* Responsive design improvements */
@media (max-width: 575.98px) {
    .container-fluid {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
    }
    
    h1 {
        font-size: 1.5rem;
    }
    
    .form-control, .form-select {
        font-size: 16px;
        padding: 0.75rem;
    }
    
    .btn-lg {
        padding: 0.75rem 1.5rem;
        font-size: 1.1rem;
    }
}

@media (min-width: 576px) and (max-width: 767.98px) {
    h1 {
        font-size: 1.8rem;
    }
    
    .form-control, .form-select {
        padding: 0.75rem;
    }
}

@media (min-width: 768px) {
    h1 {
        font-size: 2.2rem;
    }
    
    .form-control, .form-select {
        padding: 0.875rem;
        font-size: 1.1rem;
    }
    
    .btn-lg {
        padding: 0.875rem 2rem;
        font-size: 1.2rem;
    }
}

@media (min-width: 1200px) {
    h1 {
        font-size: 2.5rem;
    }
    
    .form-control, .form-select {
        padding: 1rem;
        font-size: 1.2rem;
    }
    
    .btn-lg {
        padding: 1rem 2.5rem;
        font-size: 1.3rem;
    }
    
    .form-label {
        font-size: 1.1rem;
        font-weight: 500;
    }
}

/* Form element styling */
* {
    box-sizing: border-box;
}

.form-control, .form-select {
    width: 100%;
    max-width: 100%;
    transition: all 0.3s ease;
}

.form-control:focus, .form-select:focus {
    transform: scale(1.02);
    box-shadow: 0 0 0 0.25rem rgba(39, 95, 218, 0.25);
}

.btn {
    min-width: 140px;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 767.98px) {
    .btn {
        width: 100%;
        min-width: auto;
    }
}
</style>