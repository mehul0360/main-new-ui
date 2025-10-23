import { ref } from "vue";
import { defineStore } from "pinia";

export const useStepSixStore = defineStore('stepSix', () => {
    const payload = ref({
        // Mandatory Mapping (from MandatoryMapping.vue)
        storeMappings: [
            { id: 1, retailStore: '', shopifyStore: '' }
        ],

        // Buffer Quantity Configuration (from BufferQuantityConfig.vue)
        bufferQuantityMappings: [
            { id: 1, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 },
            { id: 2, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 }
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

        console.log('Step 6 data saved to Pinia store:', payload.value);
    }

    function clearStorage() {
        payload.value = {
            storeMappings: [
                { id: 1, retailStore: '', shopifyStore: '' }
            ],
            bufferQuantityMappings: [
                { id: 1, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 },
                { id: 2, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 }
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
