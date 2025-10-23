<script setup>
import { ref, onMounted, defineExpose } from 'vue';
import { storeToRefs } from 'pinia';
import { useStepFourStore } from '@/stores/connection-steps/stepfour';
import TwoWayArrow from '@/components/Icons/TwoWayArrow.vue';

// Initialize store
const stepFourStore = useStepFourStore();
const { payload, isSaved } = storeToRefs(stepFourStore);

const mappings = ref([
    { id: 1, retailField: '', shopifyField: '' },
    { id: 2, retailField: '', shopifyField: '' },
    { id: 3, retailField: '', shopifyField: '' },
    { id: 4, retailField: '', shopifyField: '' }
]);

// Load stored data
const loadStoredData = () => {
    if (isSaved.value && payload.value && payload.value.additionalMappings) {
        console.log('Loading CustomerAdditionalMapping data from store');

        if (payload.value.additionalMappings.length > 0) {
            mappings.value = JSON.parse(JSON.stringify(payload.value.additionalMappings));
        }

        console.log('✓ CustomerAdditionalMapping data loaded');
    }
};

onMounted(() => {
    loadStoredData();
});

const addMapping = () => {
    mappings.value.push({
        id: Date.now(),
        retailField: '',
        shopifyField: ''
    });
};

const removeMapping = (id) => {
    if (mappings.value.length > 1) {
        mappings.value = mappings.value.filter(m => m.id !== id);
    }
};

// Method to get form data
const getFormData = () => {
    return {
        additionalMappings: JSON.parse(JSON.stringify(mappings.value))
    };
};

// Expose methods to parent
defineExpose({
    getFormData
});
</script>

<template>
    <div class="card shadow-sm">
        <div class="card-body p-4">
            <div class="mb-4">
                <h5 class="fw-semibold mb-2"
                    style="color: #101828; font-size: 20px; font-family: 'Poppins', sans-serif; line-height: 28px;">
                    Additional Mappings
                </h5>
                <p class="text-muted mb-0"
                    style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #4a5565; line-height: 20px;">
                    Add optional mappings to match additional customer attributes.
                </p>
            </div>

            <div class="row g-4 py-2 border-bottom mb-3" style="border-color: #e5e7eb;">
                <div class="col-4">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Retail Express Field
                    </strong>
                </div>
                <div class="col-1 text-center"></div>
                <div class="col-4">
                    <strong
                        style="font-size: 14px; font-family: 'Roboto', sans-serif; color: #101828; font-weight: 500;">
                        Shopify Field
                    </strong>
                </div>
                <div class="col-1"></div>
            </div>

            <div v-for="mapping in mappings" :key="mapping.id" class="row g-4 align-items-center mb-3">
                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="mapping.retailField" class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option value="first_name">First Name</option>
                            <option value="last_name">Last Name</option>
                            <option value="company">Company</option>
                            <option value="addresses">Addresses</option>
                            <option value="phone">Phone</option>
                            <option value="mobile">Mobile</option>
                            <option value="receive_email">Receive Email</option>
                            <option value="receive_sms">Receive SMS</option>
                            <option value="price_groups">Price Groups</option>
                            <option value="receive_post">Receive Post</option>
                            <option value="custom_reference">Custom Reference</option>
                            <option value="home_outlet">Home Outlet</option>
                            <option value="account">Account</option>
                            <option value="survey_details">Survey Details</option>
                            <option value="abn">ABN</option>
                            <option value="website">Website</option>
                            <option value="date_of_birth">Date of Birth</option>
                        </select>
                    </div>
                </div>

                <div class="col-1 text-center">
                    <two-way-arrow />
                </div>

                <div class="col-4">
                    <div class="position-relative">
                        <select v-model="mapping.shopifyField" class="form-select custom-select"
                            style="font-size: 14px; height: 36px; font-family: 'Roboto', sans-serif;">
                            <option value="">Select field</option>
                            <option value="first_name">First Name</option>
                            <option value="last_name">Last Name</option>
                            <option value="company">Company</option>
                            <option value="addresses">Addresses</option>
                            <option value="phone">Phone</option>
                            <option value="mobile">Mobile</option>
                            <option value="receive_email">Receive Email</option>
                            <option value="receive_sms">Receive SMS</option>
                            <option value="price_groups">Price Groups</option>
                            <option value="receive_post">Receive Post</option>
                            <option value="custom_reference">Custom Reference</option>
                            <option value="home_outlet">Home Outlet</option>
                            <option value="account">Account</option>
                            <option value="survey_details">Survey Details</option>
                            <option value="abn">ABN</option>
                            <option value="website">Website</option>
                            <option value="date_of_birth">Date of Birth</option>
                        </select>
                    </div>
                </div>

                <div class="col-1">
                    <button @click="removeMapping(mapping.id)" type="button" class="btn btn-sm btn-delete p-0"
                        style="width: 32px; height: 32px; border: none; border-radius: 6px; background-color: transparent;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#6c757d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="delete-icon">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <button @click="addMapping" type="button" class="btn btn-add-mapping mt-2 d-inline-flex align-items-center"
                style="border: 1px solid #F20F52; color: #F20F52; background-color: white; font-size: 14px; font-family: 'Roboto', sans-serif; font-weight: 500; height: 36px; padding: 8px 16px; gap: 8px; border-radius: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                </svg>
                Add Mapping
            </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.custom-select {
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    color: #101828;
    transition: all 0.15s ease;
}

.custom-select:focus {
    border-color: #F20F52;
    box-shadow: 0 0 0 3px rgba(242, 15, 82, 0.1);
    outline: none;
}

.custom-select:hover {
    background-color: #f9fafb;
}

.btn-delete {
    transition: all 0.15s ease;
}

.btn-delete:hover {
    background-color: #fef2f2 !important;
}

.btn-delete:hover .delete-icon {
    stroke: #dc2626 !important;
}

.btn-delete:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    outline: none;
}

.btn-add-mapping {
    transition: all 0.15s ease;
}

.btn-add-mapping:hover {
    background-color: #F20F52 !important;
    color: white !important;
    border-color: #F20F52 !important;
}

.btn-add-mapping:focus {
    box-shadow: 0 0 0 3px rgba(242, 15, 82, 0.1);
    outline: none;
}

.btn-add-mapping:hover svg {
    stroke: white;
}

.border-bottom {
    border-color: #e5e7eb !important;
}
</style>
