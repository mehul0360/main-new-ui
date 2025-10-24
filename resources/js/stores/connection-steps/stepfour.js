import { ref } from "vue";
import { defineStore } from "pinia";

export const useStepFourStore = defineStore('stepFour', () => {
    const payload = ref({
        primaryId: 'email',

        tierGroupSystem: 'standard_shopify',
        tierGroupMappings: [
            { id: 1, priceGroup: '', shopifyTier: '' },
            { id: 2, priceGroup: '', shopifyTier: '' },
            { id: 3, priceGroup: '', shopifyTier: '' }
        ],

        importExistingCustomers: false,
        defaultCustomerType: '',
        defaultPaymentTerms: '',
        sendWelcomeEmail: false,

        additionalMappings: [
            { id: 1, retailField: '', shopifyField: '' },
            { id: 2, retailField: '', shopifyField: '' },
            { id: 3, retailField: '', shopifyField: '' },
            { id: 4, retailField: '', shopifyField: '' }
        ],

        savedAt: null
    });

    const isSaved = ref(false);

    async function saveInStorage(data) {
        payload.value = {
            ...data,
            savedAt: new Date().toISOString()
        };
        isSaved.value = true;
    }

    function clearStorage() {
        payload.value = {
            tierGroupSystem: 'standard_shopify',
            tierGroupMappings: [
                { id: 1, priceGroup: '', shopifyTier: '' },
                { id: 2, priceGroup: '', shopifyTier: '' },
                { id: 3, priceGroup: '', shopifyTier: '' }
            ],
            importExistingCustomers: false,
            defaultCustomerType: '',
            defaultPaymentTerms: '',
            sendWelcomeEmail: false,
            additionalMappings: [
                { id: 1, retailField: '', shopifyField: '' },
                { id: 2, retailField: '', shopifyField: '' },
                { id: 3, retailField: '', shopifyField: '' },
                { id: 4, retailField: '', shopifyField: '' }
            ],
            savedAt: null
        };
        isSaved.value = false;
    }

    function getPayload() {
        return payload.value;
    }

    return {
        payload,
        isSaved,
        saveInStorage,
        clearStorage,
        getPayload
    };
}, {
    persist: true
});
